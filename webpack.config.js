const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports ={
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    mode: 'development',
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        }),
        new ExtractTextPlugin({
            // 从js文件中提取出来的 .css文件的名称
            filename: `main.css`}),
        new VueLoaderPlugin(),
        
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    },
    
performance: {
 
    hints: "warning", // 枚举
     
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
     
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
     
    assetFilter: function(assetFilename) {
     
    // 提供资源文件名的断言函数
     
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
     
    }
     
    },
    module: { // 配置所有第三方loader 模块的
        rules: [ // 第三方模块的匹配规则
          { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理 CSS 文件的 loader
          { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
          { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
          { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
          // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
          { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
          { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
          { test: /\.vue$/,use: 'vue-loader'}]
      },
      externals: {
        jquery: 'jQuery'
      },
      devtool: 'source-map',
      resolve: {
        alias: { // 修改 Vue 被导入时候的包的路径
          // "vue$": "vue/dist/vue.js"
        },
    }
}