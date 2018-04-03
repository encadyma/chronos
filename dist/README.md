### Chronos: Building Instructions

Welcome to the `/dist/` folder. By default (as per the `package.json` file), all extension builds will be placed here.

Ensure that you have all dependencies downloaded via `npm install` or `yarn install`. In addition, ensure that `web-ext` is installed globally [(more info)](https://github.com/mozilla/web-ext).

There are two main ways of building Chronos:

#### Method 1: Build uncompressed version
This method will build to the `./build` folder. In Firefox, add-ons can be temporarily loaded by selecting any file within the folder.

1. `cd your/path/to/webext-chronos`
2. `webpack .` - wait for webpack to build
3. Extension output should now be in `./build`.

#### Method 2: Build compressed version
This method will build a `.zip`-ed extension to the `./dist` folder, which can then be uploaded to AMO (https://addons.mozilla.org) for publication. **ONLY FOR RELEASE.**

1. `cd your/path/to/webext-chronos`
2. `yarn run build` -- this will create a webpack build and use `web-ext` to compress the build
3. Extension output should not be in `./dist`.