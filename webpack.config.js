var webpack = require('webpack');

function buildConfig(appName){
    return {
        output: {
            filename: appName+'.min.js'
        },
        plugins: [
          new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
          })
        ],
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['react', 'es2015']
                    }
                }
            ]
        }
    }
}

module.exports = buildConfig;