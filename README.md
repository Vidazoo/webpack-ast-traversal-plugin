<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Webpack AST Traversal Plugin</h1>
  <p>Plugin that traverse the AST of your code to find specific call expressions</p>
</div>
<h2 align="center">Install for Webpack 3.x</h2>

```bash
  npm i --save-dev @vidazoo/webpack-ast-traversal-plugin-v3
```

```bash
  yarn add --dev @vidazoo/webpack-ast-traversal-plugin-v3
```

<h2 align="center">Install for Webpack 4.x</h2>

```bash
  npm i --save-dev @vidazoo/webpack-ast-traversal-plugin-v4
```

```bash
  yarn add --dev @vidazoo/webpack-ast-traversal-plugin-v4
```

This is a [webpack](http://webpack.js.org/) plugin that traverse the AST of your code to find specific call expressions.  
Sometimes you want to remove or be notified about call expressions in your code, for example the `console` methods or the `alert` method.
With this plugin you can choose to be warned about any call expression, remove this expressions from the code, or even stop the build process.

<h2>Usage</h2>

**webpack.config.js**
```javascript
const WebpackAstTraversalPlugin = require("@vidazoo/webpack-ast-traversal-plugin-v4");

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new WebpackAstTraversalPlugin(/* options */)
  ]
}
```

<h2>Options</h2>

**Global Options**

| Name | Type | Default | Description |
| - | - | - | - |
| **`ignoreComment`** | `{String}` | `@ast-traversal-ignore` | The ignore comment used to ignore AST nodes |
| **`action`** | `{String}`| `warn` | The default action for all expressions |
| **`callExpressions`** | `{Array}`| see below for options | List of call expression patterns and action to take. |


**Call Expression Options**

Each item in the `callExpressions` option:


| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| **`identifier`** | `{String}`| `true` | None | Call expression identifier pattern |
| **`action`** | `{String}`| `false` | `warn` | Action to take |


**Action**

Each action can be one of:

* `remove` - Remove any matched nodes.
* `warn` - Warn about matched nodes.
* `error` - Throw error and stop webpack build on matched nodes.


<h2>Example</h2>

```javascript
const WebpackAstTraversalPlugin = require("@vidazoo/webpack-ast-traversal-plugin-v4");

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
      new WebpackAstTraversalPlugin({
          ignoreComment: "@ast-traversal-ignore",
          action: actionType.WARN,
          callExpressions: [
              {identifier: "*.console.*", action: actionType.WARN},
              {identifier: "*.alert.*", action: actionType.ERROR}
              {identifier: "myObject.myMethod.*", action: actionType.ERROR}
          ]
      })
  ]
}
```
`"*.console.*"` will match any `console` method call expression, for example:
`console.log()`, `console.warn()`, `console.error()`, `window.console.log()`, `window.console.error.call()`, `console.log.apply()`, `console.log.call()`... 

`"myObject.myMethod.*"` will match `myObject.myMethod()`, `myObject.myMethod.call()`, `myObject.myMethod.apply()`

<h2>Ignore Call Expressions</h2>

Sometimes you have call expressions in your code you want to ignore, you can do it by adding the `ignoreComment` above the line you want to ignore, for example:

```javascript

function log() {
    //@ast-traversal-ignore
    console.log.apply(arguments);
}

```

<h2>License</h2>

MIT License

Copyright (c) 2019 Vidazoo Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

