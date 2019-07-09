<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Webpack AST Traversal Plugin</h1>
  <p>Plugin that traverse the AST of your code to look for predefined expressions</p>
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

This is a [webpack](http://webpack.js.org/) plugin that traverse the AST of your code and look for predefined expressions.  
Sometimes you want to remove or be notified about call expressions in your code, for example the `console` functions or the `alert` function.
With this plugin you can choose to be warned about any call expression, remove this expressions from the code, or even stop the build process.

<h2 align="center">Usage</h2>

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

<h2 align="center">Options</h2>


|Name|Type|Description|  
|-|-|-|-|  
|**`ignoreComment`**|`{String}`|The ignore comment used to ignore ast nodes|  
|**`action`**|`ignore|remove|warn|error`|The default action|  
|**`callExpressions`**|`{Array}`|The default action|  
