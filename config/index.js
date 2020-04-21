// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
let host='192.168.0.11'  //培强
let port = 81;

// let host='192.168.0.170'  //绍琪
// let port = 81;

// let host='192.168.0.170'  //冬冬
// let port = 88;

module.exports = {
  build_test: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist_test/main.html'),
    assetsRoot: path.resolve(__dirname, '../dist_test'),
    assetsSubDirectory:'static' ,
    assetsPublicPath: '/',
    productionSourceMap:process.env.NODE_ENV == 'development',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port:100,//Math.ceil(Math.random()*10000)+10000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/index.php': {
        'target': {
          'host': host
          , 'protocol': 'http:'
          , 'port': port
        },
        secure: false,
        bypass: function (req, res, proxyOptions) {
            console.log(JSON.stringify(req))
          /* if (req.headers.accept.indexOf('html') !== -1) {
           console.log('Skipping proxy for browser request.');
           return '/index.html';
           }*/
        }
      }
      ,'/livecode' :{
        'target': {
          'host': '192.168.0.147'
          , 'protocol': 'http:'
          , 'port': 8199
        },
        secure: false
        ,bypass: function (req, res, proxyOptions) {
          console.log(JSON.stringify(req))
        }
      }
      ,'/uplog' :{
          'target': {
              'host': '192.168.0.108'
              , 'protocol': 'http:'
              , 'port': 10000
          },
          secure: false
          ,bypass: function (req, res, proxyOptions) {
              console.log(JSON.stringify(req))
          }
      }
      ,'/qiyewxapi' :{
          'target': {
              'host': '192.168.0.72'
              , 'protocol': 'http:'
              , 'port': 8999
          },
          secure: false
          ,bypass: function (req, res, proxyOptions) {
              console.log(JSON.stringify(req))
          }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
