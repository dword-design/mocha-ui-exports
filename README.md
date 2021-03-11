<!-- TITLE/ -->
# mocha-ui-exports-auto-describe
<!-- /TITLE -->

<!-- BADGES/ -->
[![NPM version](https://img.shields.io/npm/v/mocha-ui-exports-auto-describe.svg)](https://npmjs.org/package/mocha-ui-exports-auto-describe)
![Linux macOS Windows compatible](https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue)
[![Build status](https://github.com/dword-design/mocha-ui-exports-auto-describe/workflows/build/badge.svg)](https://github.com/dword-design/mocha-ui-exports-auto-describe/actions)
[![Coverage status](https://img.shields.io/coveralls/dword-design/mocha-ui-exports-auto-describe)](https://coveralls.io/github/dword-design/mocha-ui-exports-auto-describe)
[![Dependency status](https://img.shields.io/david/dword-design/mocha-ui-exports-auto-describe)](https://david-dm.org/dword-design/mocha-ui-exports-auto-describe)
![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen)

<a href="https://gitpod.io/#https://github.com/dword-design/bar">
  <img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod">
</a><a href="https://www.buymeacoffee.com/dword">
  <img
    src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
    alt="Buy Me a Coffee"
    height="32"
  >
</a><a href="https://paypal.me/SebastianLandwehr">
  <img
    src="https://dword-design.de/images/paypal.svg"
    alt="PayPal"
    height="32"
  >
</a><a href="https://www.patreon.com/dworddesign">
  <img
    src="https://dword-design.de/images/patreon.svg"
    alt="Patreon"
    height="32"
  >
</a>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
Like the built-in Mocha exports UI but also adds a describe block per-file.
<!-- /DESCRIPTION -->

<!-- INSTALL/ -->
## Install

```bash
# NPM
$ npm install mocha-ui-exports-auto-describe

# Yarn
$ yarn add mocha-ui-exports-auto-describe
```
<!-- /INSTALL -->

## Usage

Structure your tests as usual:
```
|-test
  |-index.test.js
  |-cli.test.js
```

Run mocha. The output will contain describe blocks per-file:
```bash
$ mocha --require mocha-ui-exports-auto-describe

  index
    ✓ valid
    ✓ special case
  cli
    ✓ command works
    ✓ options work

  1 passing
```

<!-- LICENSE/ -->
## License

Unless stated otherwise all works are:

Copyright &copy; Sebastian Landwehr <info@dword-design.de>

and licensed under:

[MIT License](https://opensource.org/licenses/MIT)
<!-- /LICENSE -->
