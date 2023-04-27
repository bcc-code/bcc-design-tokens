# @bcc-code/design-tokens
A collection of tokens from the BCC design system.

[![version](https://img.shields.io/npm/v/@bcc-code/design-tokens)](https://github.com/bcc-code/bcc-design-tokens/releases) [![license](https://img.shields.io/npm/l/@bcc-code/design-tokens)](https://github.com/bcc-code/bcc-design-tokens/blob/main/LICENSE)

## Installation & Usage
Refer to the [documentation](https://developer.bcc.no/bcc-design/tokens) for installation instructions and usage information.

## Project structure
All code is in the `src` folder. To `input` the exported tokens from Figma are saved. This file is checked in as well to enable using GitHub as a sync provider.

In Figma the [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/Tokens-Studio-for-Figma-(Figma-Tokens)) plugin is used. This output is transformed with the [token-transformer](https://github.com/tokens-studio/figma-plugin/tree/main/token-transformer) package provided by Tokens Studio to a [Style Dictionary](https://amzn.github.io/style-dictionary/) format.

This Style Dictionary format is then taken by our custom `convertToTailwind` script that converts this output to a Tailwind theme. This script is intentionally custom because we want to do some transformations that are not available with the existing Tailwind plugin for Style Dictionary, like stripping off some naming that designers add that we don't need on our side

## License
This package is licensed under the [Apache 2.0 license](./LICENSE).
