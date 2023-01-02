const path = require('path') 

module.exports = {
  
  publicPath: '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['./node_modules', './src/assets'],
        },
      },
    },
  },
  configureWebpack: {
    module: {
    //   rules: [
    //    {
    //     test: /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/,
    //     loaders: {
    //         loader: 'file-loader',
    //         options: {
    //             name: 'images/[path][name].[ext]',
    //             context: '../vuexy-vuejs-bootstrap-vue-template/src/assets/images'
    //             //   context: 'frontend/src/assets/images'
    //         }
    //     }
    // },
    //   ]
    }, 
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@validations': path.resolve(__dirname, 'src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
      },
    },
  },
  chainWebpack: config => {
    config.module
    
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src',
        }
        return options
      })

      const svgRule = config.module.rule('svg');
 
    svgRule.uses.clear(); 
 
    
      
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()  
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [{ removeDimensions: false }, { removeViewBox: false }]
        }
       } ) 
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
}
