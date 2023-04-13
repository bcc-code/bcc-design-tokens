const fs = require('fs').promises;

async function writeColors(figmaInput) {
  let colors = figmaInput.colors;

  for (let [colorKey] of Object.entries(colors)) {
    for (let [colorWeightKey, colorWeightToken] of Object.entries(colors[colorKey])) {
      colors[colorKey][colorWeightKey] = colorWeightToken.value;
    }
  }

  let content = `export const colors = ${JSON.stringify(colors, null, 2)};`

  await fs.writeFile('./src/tailwind/colors.ts', content, 'utf8');
}

async function writeTextColors(figmaInput) {
  const globalTextColor = figmaInput.global.foreground;

  for (let [tokenKey, tokenValue] of Object.entries(globalTextColor)) {
    globalTextColor[tokenKey] = tokenValue.value;
  }

  const buttonVariants = figmaInput.button;
  let buttonForegroundColors = {};

  // variantKey = primary, secondary etc.
  for (let [variantKey] of Object.entries(buttonVariants)) {
    // itemKey = background, foreground, border etc.
    for (let [itemKey, itemValue] of Object.entries(buttonVariants[variantKey])) {
      if (itemKey === 'foreground') {
        buttonForegroundColors[variantKey] = {};

        // tokenKey = default, hover, pressed etc.
        // tokenValue = hex color value
        for (let [tokenKey, tokenValue] of Object.entries(itemValue)) {
          buttonForegroundColors[variantKey][tokenKey] = tokenValue.value;
        }
      }
    }
  }

  const textColor = {
    ...globalTextColor,
    button: buttonForegroundColors,
  }

  let content = `export const textColor = ${JSON.stringify(textColor, null, 2)};`

  await fs.writeFile('./src/tailwind/textColor.ts', content, 'utf8');
}

async function writeBorderColors(figmaInput) {
  const globalBorderColor = figmaInput.global.border;

  for (let [tokenKey, tokenValue] of Object.entries(globalBorderColor)) {
    globalBorderColor[tokenKey] = tokenValue.value;
  }

  const buttonVariants = figmaInput.button;
  let buttonBorderColors = {};

  // variantKey = primary, secondary etc.
  for (let [variantKey] of Object.entries(buttonVariants)) {
    // itemKey = background, foreground, border etc.
    for (let [itemKey, itemValue] of Object.entries(buttonVariants[variantKey])) {
      if (itemKey === 'border') {
        buttonBorderColors[variantKey] = {};

        // tokenKey = default, hover, pressed etc.
        // tokenValue = hex color value
        for (let [tokenKey, tokenValue] of Object.entries(itemValue)) {
          buttonBorderColors[variantKey][tokenKey] = tokenValue.value;
        }
      }
    }
  }

  const borderColor = {
    ...globalBorderColor,
    button: buttonBorderColors,
  }

  let content = `export const borderColor = ${JSON.stringify(borderColor, null, 2)};`

  await fs.writeFile('./src/tailwind/borderColor.ts', content, 'utf8');

  let outlineContent = `export const outlineColor = ${JSON.stringify(borderColor, null, 2)};`

  await fs.writeFile('./src/tailwind/outlineColor.ts', outlineContent, 'utf8');
}

async function writeBackgroundColors(figmaInput) {
  // Normal background
  const backgroundColors = figmaInput.global.background;

  for (let [variantKey] of Object.entries(backgroundColors)) {
    for (let [tokenKey, tokenValue] of Object.entries(backgroundColors[variantKey])) {
      backgroundColors[variantKey][tokenKey] = tokenValue.value;
    }
  }

  // Button background
  const buttonVariants = figmaInput.button;
  let buttonBackgroundColors = {};

  // variantKey = primary, secondary etc.
  for (let [variantKey] of Object.entries(buttonVariants)) {
    // itemKey = background, foreground, border etc.
    for (let [itemKey, itemValue] of Object.entries(buttonVariants[variantKey])) {
      if (itemKey === 'background') {
        buttonBackgroundColors[variantKey] = {};

        // tokenKey = default, hover, pressed etc.
        // tokenValue = hex color value
        for (let [tokenKey, tokenValue] of Object.entries(itemValue)) {
          buttonBackgroundColors[variantKey][tokenKey] = tokenValue.value;
        }
      }
    }
  }

  const backgroundColor = {
    ...backgroundColors,
    button: buttonBackgroundColors,
  }

  let content = `export const backgroundColor = ${JSON.stringify(backgroundColor, null, 2)};`

  await fs.writeFile('./src/tailwind/backgroundColor.ts', content, 'utf8');
}

async function getFigmaInput() {
  let content = await fs.readFile('./temp/figma-transformed.json', 'utf-8');
  content = JSON.parse(content);
  return content;
}

async function main() {
  console.log("Building Tailwind config elements...")

  const figmaInput = await getFigmaInput();

  await writeColors(figmaInput);
  await writeTextColors(figmaInput);
  await writeBorderColors(figmaInput);
  await writeBackgroundColors(figmaInput);

  return console.log("Finished building Tailwind config")
}
  
main()
