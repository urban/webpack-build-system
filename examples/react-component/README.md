# React.js component example

This is a simple [React.js](http://facebook.github.io/react/) component example that bundles all dependencies and copies all assets to the specified `output` directory.

```js
import getConfig from '@urban/webpack-build-system'

export default getConfig({
  entry: './src/index.js',
  out: 'public/'
})
```

To view this example, type the following command.

```sh
npm start
```

To build this example to the specified output directory, type the following command.

```sh
npm run build
```
