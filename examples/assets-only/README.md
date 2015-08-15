# Assets Only Example

This is a simple example that only builds assets for your project such as JavaScript, CSS, and etc. to the `public` directory.

## Commands

```sh
$ npm install
$ npm start
$ npm run build
```

## Code

```js
'use strict'

var getConfig = require('@urban/webpack-build-system')

module.exports = getConfig({
  entry: 'src/index.jsx',
  output: {
    path: 'public/'
  }
})
```

## License

This software is released into the public domain.
