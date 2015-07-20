# Webpack build system

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

> An opinionated build system using Webpack.

Continually creating a new build step for each project detracts time away from what's unique about your project. This is a consolidation of the tools and libraries I use for 80% of my projects into one build-system so I can speed up my "time to development" and focus on what's unique about my projects. It's an opinionated stack based on [webpack](http://webpack.github.io/) and the [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) with smart defaults that simplify configuration.

## Tools used

### webpack

[webpack](http://webpack.github.io) is a module bundler. It takes JavaScript modules with dependencies (i.e. other JavaScript files, CSS, images, ...) and generates static assets representing those modules for the browser. It's similar to [Browserify](http://browserify.org/) with a few extra features such as [React hot-loading](https://github.com/gaearon/react-hot-loader).

- **Loaders**
  + [babel](https://github.com/babel/babel-loader) - Turn ES6 code into vanilla ES5 using [Babel](https://babeljs.io).
  + [css](https://github.com/webpack/css-loader) - Loads css file with resolved imports and returns css code.
  + [file](https://github.com/webpack/file-loader) - Emits the file into the output folder and returns the (relative) url.
  + [json](https://github.com/webpack/json-loader) - Loads file as JSON.
  + [postcss](https://github.com/postcss/postcss-loader) - Post-process CSS with Autoprefixer and other [PostCSS plugins](https://github.com/postcss/postcss#built-with-postcss).
  + [style](https://github.com/webpack/style-loader) - Add exports of a module as style to DOM.
  + [url](https://github.com/webpack/url-loader) - The url loader works like the file loader, but can return a Data Url if the file is smaller than a limit.

- **Plugins**
  + [BannerPlugin](http://webpack.github.io/docs/list-of-plugins.html#bannerplugin) - Adds a banner to the top of each generated chunk.
  + [DedupePlugin](http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin) - Reduces file size by removing duplicate files.
  + [DefinePlulgin](http://webpack.github.io/docs/list-of-plugins.html#defineplugin) - Inlines variables into the code which allows a minification pass to remove unused (dead) code.
  + [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) - Moves required CSS into a separate CSS output file.
  + [HotModuleReplacementPlugin](http://webpack.github.io/docs/list-of-plugins.html#hotmodulereplacementplugin) - Enables Hot Module Replacement.
  + [NoErrorsPlugin](http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin) - Prevents the output when an error occurs.
  + [OccurenceOrderPlugin](http://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin) - Assign the module and chunk ids by occurrence count making ids predictable and reduces the total file size.
  + [UglifyJs](http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) - Minimize all JavaScript output of chunks.

### Babel

[Babel](https://babeljs.io) is a JavaScrpt compiler. With it, you can transpile features of ES2015, ES2016 and more into ES5. These means you can use new the JavaScript syntax and features, **right now** without waiting for browser support. It also has built-in support for JSX and React. 

- [Babel Runtime](https://babeljs.io/docs/usage/runtime/) - Reduces you bundle size and creates a sandboxed environment for built-ins without having to require a globally polluting [polyfill](http://babeljs.io/docs/usage/polyfill/).

### PostCSS

[PostCSS](https://github.com/postcss/postcss) is a tool for transforming CSS.  It transforms CSS written to published specs and standards that aren't implemented in all modern browsers to CSS that the browsers understand. Basically, you can write CSS using **tomorrows syntax today**.

- [Autoprefixer](https://github.com/postcss/autoprefixer) - CSS and add vendor prefixes to CSS rules using values from [Can I Use](http://caniuse.com/).


## Install

This project is published as a scoped package. Use the following to install and save it as a dependency.

```sh
npm i --save @urban/webpack-build-system
```

**Note about `peerDependencies`**

`webpack-build-system` specifies many of its dependencies as `peerDependencies` in order to give the consumer of this package flexibility to decide which version to use. For instance, you might want to use React 0.12.x instead of version 0.13.x.

In npm version `3.x.x`, `peerDependencies` are no longer installed by default. In order to install the latest versions of this packages `peerDependencies`, please run the following command.

```sh
npm i --save-dev autoprefixer-core babel babel-core babel-runtime babel-loader css-loader file-loader json-loader postcss-loader react-hot-loader style-loader url-loader webpack webpack-dev-server
```

## Usage

Create a `webpack.config.js` file at the root of your project with the following content.

```js
var getConfig = require('@urban/webpack-build-system')

module.exports = getConfig({
  // the entry point for your application
  entry: 'src/index.js',
  // the path of an output directory for your bundled application
  output: {
    path: 'public/'
  }
})
```

Next, add the following to the `scripts` section of your `package.json` file.

```js
"scripts": {
  "start": "webpack-dev-server",
  "build": "webpack"
}
```

You can now run your project with `npm start` and view it by opening a browser to `http://localhost:3000`.

If you'd like to build the static assets for your project, run `npm run build` and they will be generated into the `public` directory.

It's a good idea to completely destroy and re-create your output directory when building. To do this, add a `pre-` hook to your `npm run build` command.

First, install `rimraf` with the following.

```sh
npm i --save rimraf
```

Then add it as a `prebuild` script to your `package.json` file. Your final `scripts` section will look like the following.

```js
"scripts": {
  "start": "webpack-dev-server",
  "prebuild": "rimraf public",
  "build": "webpack"
}
```


## Examples

...

## Config options

### Babel config

To change the default [Babel](http://babeljs.io) settings, create a file at the root of your project called `.babelrc` that contains the [options](http://babeljs.io/docs/usage/options/) you'd like. 

See [babelrc](https://babeljs.io/docs/usage/babelrc/) for more information.

```json
{
  "stage": 0,
  "loose": "all"
}
```


### Autoprefixer config

To change the default [Autoprefixer](https://github.com/postcss/autoprefixer) settings, create a file at the root of your project called `browserslist` that contains the options you'd like. 

See [Browserslist docs](https://github.com/ai/browserslist#queries) for queries, browser names, config format, and default value.

```sh
# Browsers that we support

> 1%
Last 2 versions
IE 8 # sorry
```


## Credits

Inspired by:

- [webpack-how-to](https://github.com/petehunt/webpack-howto)
- [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack)
- [babel-library-boilerplate](https://github.com/babel/babel-library-boilerplate)
- [Este.js](https://github.com/este/este)
- [library-boilerplate](https://github.com/gaearon/library-boilerplate)


## License

[The MIT License (MIT)](LICENSE). Copyright (c) [Urban Faubion](http://urbanfaubion.com).
