# Webpack build system

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

> An opinionated build system using Webpack.

Continually creating a new build step for each project detracts time away from what's unique about your project. This is a consolidation of the tools and libraries I use for 80% of my projects into one build-system so I can speed up my "time to development" and focus on what's unique about my projects. It's an opinionated stack based on [webpack](http://webpack.github.io/) and the [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) with smart defaults that simplify configuration.

## Tools used

- [webpack](http://webpack.github.io)
  + Loaders
    * [babel](https://github.com/babel/babel-loader) - Turn ES6 code into vanilla ES5 using [Babel](https://babeljs.io).
    * [css](https://github.com/webpack/css-loader) - Loads css file with resolved imports and returns css code.
    * [file](https://github.com/webpack/file-loader) - Emits the file into the output folder and returns the (relative) url.
    * [json](https://github.com/webpack/json-loader) - Loads file as JSON.
    * [postcss](https://github.com/postcss/postcss-loader) - Post-process CSS with Autoprefixer and other [PostCSS plugins](https://github.com/postcss/postcss#built-with-postcss).
    * [style](https://github.com/webpack/style-loader) - Add exports of a module as style to DOM.
    * [url](https://github.com/webpack/url-loader) - The url loader works like the file loader, but can return a Data Url if the file is smaller than a limit.
  + Plugins
    * [DedupePlugin](http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin)
    * [DefinePlulgin](http://webpack.github.io/docs/list-of-plugins.html#defineplugin)
    * [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin)
    * [HotModuleReplacementPlugin](http://webpack.github.io/docs/list-of-plugins.html#hotmodulereplacementplugin)
    * [NoErrorsPlugin](http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin)
    * [OccurenceOrderPlugin](http://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin)
    * [UglifyJs](http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin)
- [Babel](https://babeljs.io)
  + [Babel Runtime](https://babeljs.io/docs/usage/runtime/)
- [PostCSS](https://github.com/postcss/postcss)
  + [Autoprefixer](https://github.com/postcss/autoprefixer)


## Install

```sh
npm install --save @urban/webpack-build-system
```

**Note about `peerDependencies`**

`webpack-build-system` specifies many of its dependencies as `peerDependencies` in order to give the consumer of this package flexibility to decide which version to use. For instance, you might want to use React 0.12.x instead of version 0.13.x.

In npm version `3.x.x`, `peerDependencies` are no longer installed by default. In order to install the latest versions of this packages `peerDependencies`, please run the following command.

```sh
npm install --save-dev autoprefixer-core babel babel-core babel-runtime babel-loader css-loader file-loader json-loader node-sass postcss-loader react-hot-loader style-loader sass-loader url-loader webpack webpack-dev-server
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


## Examples

...

## Config options

## Babel config

To change the Babel settings, create a file at the root of your project called `.babelrc` that contains the options you'd like. See [babelrc](https://babeljs.io/docs/usage/babelrc/) for an example.

```json
{
  "stage": 0,
  "loose": "all"
}
```

You can also specify your `.babelrc` config from within the `package.json` file.

```json
"babel": {
  "stage": 0,
  "loose": "all"
}
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
