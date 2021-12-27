<!-- TITLE/ -->
# mocha-ui-exports-auto-describe
<!-- /TITLE -->

<!-- BADGES/ -->
<p>
    <a href="https://npmjs.org/package/mocha-ui-exports-auto-describe">
      <img
        src="https://img.shields.io/npm/v/mocha-ui-exports-auto-describe.svg"
        alt="npm version"
      >
    </a><img src="https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue" alt="Linux macOS Windows compatible"><a href="https://github.com/dword-design/mocha-ui-exports-auto-describe/actions">
      <img
        src="https://github.com/dword-design/mocha-ui-exports-auto-describe/workflows/build/badge.svg"
        alt="Build status"
      >
    </a><a href="https://codecov.io/gh/dword-design/mocha-ui-exports-auto-describe">
      <img
        src="https://codecov.io/gh/dword-design/mocha-ui-exports-auto-describe/branch/master/graph/badge.svg"
        alt="Coverage status"
      >
    </a><a href="https://david-dm.org/dword-design/mocha-ui-exports-auto-describe">
      <img src="https://img.shields.io/david/dword-design/mocha-ui-exports-auto-describe" alt="Dependency status">
    </a><img src="https://img.shields.io/badge/renovate-enabled-brightgreen" alt="Renovate enabled"><br/><a href="https://gitpod.io/#https://github.com/dword-design/mocha-ui-exports-auto-describe">
      <img
        src="https://gitpod.io/button/open-in-gitpod.svg"
        alt="Open in Gitpod"
        width="114"
      >
    </a><a href="https://www.buymeacoffee.com/dword">
      <img
        src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
        alt="Buy Me a Coffee"
        width="114"
      >
    </a><a href="https://paypal.me/SebastianLandwehr">
      <img
        src="https://sebastianlandwehr.com/images/paypal.svg"
        alt="PayPal"
        width="163"
      >
    </a><a href="https://www.patreon.com/dworddesign">
      <img
        src="https://sebastianlandwehr.com/images/patreon.svg"
        alt="Patreon"
        width="163"
      >
    </a>
</p>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
Like the built-in Mocha exports UI but also adds a describe block per-file.
<!-- /DESCRIPTION -->

<!-- INSTALL/ -->
## Install

```bash
# npm
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
## Contribute

Are you missing something or want to contribute? Feel free to file an [issue](https://github.com/dword-design/mocha-ui-exports-auto-describe/issues) or a [pull request](https://github.com/dword-design/mocha-ui-exports-auto-describe/pulls)! ⚙️

## Support

Hey, I am Sebastian Landwehr, a freelance web developer, and I love developing web apps and open source packages. If you want to support me so that I can keep packages up to date and build more helpful tools, you can donate here:

<p>
  <a href="https://www.buymeacoffee.com/dword">
    <img
      src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
      alt="Buy Me a Coffee"
      width="114"
    >
  </a>&nbsp;If you want to send me a one time donation. The coffee is pretty good 😊.<br/>
  <a href="https://paypal.me/SebastianLandwehr">
    <img
      src="https://sebastianlandwehr.com/images/paypal.svg"
      alt="PayPal"
      width="163"
    >
  </a>&nbsp;Also for one time donations if you like PayPal.<br/>
  <a href="https://www.patreon.com/dworddesign">
    <img
      src="https://sebastianlandwehr.com/images/patreon.svg"
      alt="Patreon"
      width="163"
    >
  </a>&nbsp;Here you can support me regularly, which is great so I can steadily work on projects.
</p>

Thanks a lot for your support! ❤️

## See also

* [output-files](https://github.com/dword-design/output-files): Output a tree of files and directories by providing an object. Especially useful for testing with real files.
* [with-local-tmp-dir](https://github.com/dword-design/with-local-tmp-dir): Creates a temporary folder inside cwd, cds inside the folder, runs a function, and removes the folder. Especially useful for testing.
* [expect-mocha-image-snapshot](https://github.com/dword-design/expect-mocha-image-snapshot): A wrapper around jest-image-snapshot that makes it compatible to Mocha.
* [jest-image-matcher](https://github.com/dword-design/jest-image-matcher): A Jest matcher for image comparisons based on pixelmatch. Can also be used with Mocha. Useful for visual regression testing.
* [unify-mocha-output](https://github.com/dword-design/unify-mocha-output): Adjusts a Mocha output so that it is consistent across platforms and can be used for snapshot testing. Basically adjusts the checkmark symbol and removes time values.

## License

[MIT License](https://opensource.org/licenses/MIT) © [Sebastian Landwehr](https://sebastianlandwehr.com)
<!-- /LICENSE -->
