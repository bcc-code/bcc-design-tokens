const fs = require('fs').promises;

function getButtonColors(buttonVariants, type) {
  let buttonColors = {};

  // variantKey = primary, secondary etc.
  for (let [variantKey] of Object.entries(buttonVariants)) {
    // itemKey = background, foreground, border etc.
    for (let [itemKey, itemValue] of Object.entries(buttonVariants[variantKey])) {
      if (itemKey === type) {
        buttonColors[variantKey] = {};

        // tokenKey = default, hover, pressed etc.
        // tokenValue = hex color value
        for (let [tokenKey, tokenValue] of Object.entries(itemValue)) {
          buttonColors[variantKey][tokenKey] = tokenValue.value;
        }
      }
    }
  }

  return buttonColors;
}

async function writeTailwindConfig(file, content) {
  // Simplifies class names so bg-info-default becomes bg-info
  content = content.replaceAll("default", "DEFAULT");

  await fs.writeFile(file, content, 'utf8');
}

async function writeColors(figmaInput) {
  let colors = figmaInput.colors;

  for (let [colorKey] of Object.entries(colors)) {
    for (let [colorWeightKey, colorWeightToken] of Object.entries(colors[colorKey])) {
      colors[colorKey][colorWeightKey] = colorWeightToken.value;
    }
  }

  let content = `export const colors = ${JSON.stringify(colors, null, 2)};`

  await writeTailwindConfig('./src/tailwind/colors.ts', content);
}

async function writeTextColors(figmaInput) {
  const globalTextColor = figmaInput.global.foreground;

  for (let [tokenKey, tokenValue] of Object.entries(globalTextColor)) {
    globalTextColor[tokenKey] = tokenValue.value;
  }

  const buttonForegroundColors = getButtonColors(figmaInput.button, 'foreground');

  const textColor = {
    ...globalTextColor,
    button: buttonForegroundColors,
  }

  let content = `export const textColor = ${JSON.stringify(textColor, null, 2)};`

  await writeTailwindConfig('./src/tailwind/textColor.ts', content);
}

async function writeBorderColors(figmaInput) {
  const globalBorderColor = figmaInput.global.border;

  for (let [tokenKey, tokenValue] of Object.entries(globalBorderColor)) {
    globalBorderColor[tokenKey] = tokenValue.value;
  }

  const buttonBorderColors = getButtonColors(figmaInput.button, 'border');

  const borderColor = {
    ...globalBorderColor,
    button: buttonBorderColors,
  }

  let content = `export const borderColor = ${JSON.stringify(borderColor, null, 2)};`
  await writeTailwindConfig('./src/tailwind/borderColor.ts', content);

  let outlineContent = `export const outlineColor = ${JSON.stringify(borderColor, null, 2)};`
  await writeTailwindConfig('./src/tailwind/outlineColor.ts', outlineContent);
  
  let ringContent = `export const ringColor = ${JSON.stringify(borderColor, null, 2)};`
  await writeTailwindConfig('./src/tailwind/ringColor.ts', ringContent);
}

async function writeBackgroundColors(figmaInput) {
  // Page background
  // TODO hardcoded value because it's missing from the tokens
  const pageBackground = {
    'page': {
      'primary': "#F9FAFB",
      'secondary': "#FFFFFF", 
    }
  }

  // Normal background
  const backgroundColors = figmaInput.global.background;

  for (let [variantKey] of Object.entries(backgroundColors)) {
    for (let [tokenKey, tokenValue] of Object.entries(backgroundColors[variantKey])) {
      backgroundColors[variantKey][tokenKey] = tokenValue.value;
    }
  }

  // TODO hardcoded value because it's missing from the tokens
  backgroundColors.primary.default = "#FFFFFF";
  backgroundColors.secondary.default = "#ECF1F1";

  // Button background
  const buttonBackgroundColors = getButtonColors(figmaInput.button, 'background');

  const backgroundColor = {
    ...pageBackground,
    ...backgroundColors,
    button: buttonBackgroundColors,
  }

  let content = `export const backgroundColor = ${JSON.stringify(backgroundColor, null, 2)};`

  await writeTailwindConfig('./src/tailwind/backgroundColor.ts', content);
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
