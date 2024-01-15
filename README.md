# @kiforks/stylelint-config

[![npm version](https://img.shields.io/npm/v/@kiforks/stylelint-config?logo=npm&logoColor=fff)](https://www.npmjs.com/package/@kiforks/stylelint-config)
[![Build Status](https://img.shields.io/github/actions/workflow/status/kiforks/stylelint-config/cd.yml?query=workflow%3Adeploys&logo=github)](https://github.com/kiforks/stylelint-config/actions/workflows/cd.yml?query=workflow%3Adeploy)
[![Downloads per month](https://img.shields.io/npm/dm/@kiforks/stylelint-config)](https://npmcharts.com/compare/@kiforks/stylelint-config)

Created by [Kifor Kostiantyn][author-url]

> This is the standard configuration file for stylelint from [Kifor Kostiantyn](https://www.linkedin.com/in/kiforks/).

Use it as is or as a basis for your own configuration.

## Usage

You first need to install your published configuration, for example:

<!--DOCUSAURUS_CODE_TABS-->
<!--npm-->

```bash
npm install --save-dev stylelint @kiforks/stylelint-config
```

<!--yarn-->

```bash
yarn add --dev stylelint @kiforks/stylelint-config
```

<!--pnpm-->

```bash
pnpm add --save-dev stylelint @kiforks/stylelint-config
```

<!--bun-->

```bash
bun add --dev stylelint @kiforks/stylelint-config
```

In the root of the project, create a `.stylelintrc` file and in it add `@kiforks/stylelint-config` to the `extends` field.

_.stylelintrc_

```json
{
  "extends": "@kiforks/stylelint-config"
}
```

If you set `@kiforks/stylelint-config` globally with the `-g` flag, then you need to use the absolute path `@kiforks/stylelint-config` in the configuration file:

_.stylelintrc_

```json
{
  "extends": "/absolute/path/to/@kiforks/stylelint-config"
}
```

## Configure extension

You can override existing rules or add new ones.

To do this, add a `rules` field to the config with the desired rule overrides.

_.stylelintrc_

```json
{
  "extends": "@kiforks/stylelint-config",
  "rules": {
    "property-no-unknown": [
      true,
      {
        "ignoreProperties": [
          "composes"
        ]
      }
    ],
    "unit-whitelist": ["em", "rem", "s", "px"]
  }
}
```

In the same `rules` field, you can also override the no longer supported Stylelint [styleguide rules](https://github.com/firefoxic/stylelint-codeguide/blob/main/docs/user-guide/rules.md#rules) from the `stylelint-codeguide` plugin by adding the prefix `codeguide/` before the rule name.

_.stylelintrc_

```json
{
  "extends": "@kiforks/stylelint-config",
  "rules": {
    "property-no-unknown": [
      true,
      {
        "ignoreProperties": [
          "composes"
        ]
      }
    ],
    "unit-whitelist": ["em", "rem", "s", "px"],

    "codeguide/indentation": "tab",
    "codeguide/number-leading-zero": null
  }
}
```

## Usage in VSCode

1. Install stylelint and config
2. Open VSCode
3. Install the [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) plugin
4. Use it

![Inconsistencies with the config rules are underlined with a red wavy line, hovering over it will bring up a popup with the error description.](assets/images/vscode-error.png)

[author-url]: https://www.linkedin.com/in/kiforks/









