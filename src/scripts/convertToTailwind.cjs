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
  const textColors = figmaInput.global.text;

  for (let [tokenKey, tokenValue] of Object.entries(textColors)) {
    textColors[tokenKey] = tokenValue.value;
  }

  let content = `export const textColor = ${JSON.stringify(textColors, null, 2)};`

  await fs.writeFile('./src/tailwind/textColor.ts', content, 'utf8');
}

async function writeBorderColors(figmaInput) {
  const borderColors = figmaInput.global.border;

  for (let [tokenKey, tokenValue] of Object.entries(borderColors)) {
    borderColors[tokenKey] = tokenValue.value;
  }

  let content = `export const borderColor = ${JSON.stringify(borderColors, null, 2)};`

  await fs.writeFile('./src/tailwind/borderColor.ts', content, 'utf8');
}

async function writeBackgroundColors(figmaInput) {
  const surfaceColors = figmaInput.global.surface;

  for (let [variantKey] of Object.entries(surfaceColors)) {
    for (let [tokenKey, tokenValue] of Object.entries(surfaceColors[variantKey])) {
      surfaceColors[variantKey][tokenKey] = tokenValue.value;
    }
  }

  const backgroundColors = figmaInput.global.background;

  for (let [tokenKey, tokenValue] of Object.entries(backgroundColors)) {
    backgroundColors[tokenKey] = tokenValue.value;
  }

  const backgroundColor = {
    ...backgroundColors,
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
