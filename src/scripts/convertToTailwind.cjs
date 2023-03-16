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
  const globalTextColor = figmaInput.global.text;

  for (let [tokenKey, tokenValue] of Object.entries(globalTextColor)) {
    globalTextColor[tokenKey] = tokenValue.value;
  }

  const buttonOnSurfaceColors = figmaInput.button['on-surface'];

  for (let [variantKey] of Object.entries(buttonOnSurfaceColors)) {
    for (let [tokenKey, tokenValue] of Object.entries(buttonOnSurfaceColors[variantKey])) {
      buttonOnSurfaceColors[variantKey][tokenKey] = tokenValue.value;
    }
  }

  const textColor = {
    ...globalTextColor,
    button: buttonOnSurfaceColors,
  }

  let content = `export const textColor = ${JSON.stringify(textColor, null, 2)};`

  await fs.writeFile('./src/tailwind/textColor.ts', content, 'utf8');
}

async function writeBorderColors(figmaInput) {
  const globalBorderColor = figmaInput.global.border;

  for (let [tokenKey, tokenValue] of Object.entries(globalBorderColor)) {
    globalBorderColor[tokenKey] = tokenValue.value;
  }

  const buttonBorderColor = figmaInput.button.border;

  for (let [variantKey] of Object.entries(buttonBorderColor)) {
    for (let [tokenKey, tokenValue] of Object.entries(buttonBorderColor[variantKey])) {
      buttonBorderColor[variantKey][tokenKey] = tokenValue.value;
    }
  }

  const borderColor = {
    ...globalBorderColor,
    button: buttonBorderColor,
  }

  let content = `export const borderColor = ${JSON.stringify(borderColor, null, 2)};`

  await fs.writeFile('./src/tailwind/borderColor.ts', content, 'utf8');

  let outlineContent = `export const outlineColor = ${JSON.stringify(borderColor, null, 2)};`

  await fs.writeFile('./src/tailwind/outlineColor.ts', outlineContent, 'utf8');
}

async function writeBackgroundColors(figmaInput) {
  // Normal surface
  const surfaceColors = figmaInput.global.surface;

  for (let [variantKey] of Object.entries(surfaceColors)) {
    for (let [tokenKey, tokenValue] of Object.entries(surfaceColors[variantKey])) {
      surfaceColors[variantKey][tokenKey] = tokenValue.value;
    }
  }

  // Button surface
  const buttonSurfaceColors = figmaInput.button.surface;

  for (let [variantKey] of Object.entries(buttonSurfaceColors)) {
    for (let [tokenKey, tokenValue] of Object.entries(buttonSurfaceColors[variantKey])) {
      buttonSurfaceColors[variantKey][tokenKey] = tokenValue.value;
    }
  }

  // Global background
  const backgroundColors = figmaInput.global.background;

  for (let [tokenKey, tokenValue] of Object.entries(backgroundColors)) {
    backgroundColors[tokenKey] = tokenValue.value;
  }

  const backgroundColor = {
    ...backgroundColors,
    button: buttonSurfaceColors,
    surface: surfaceColors,
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
