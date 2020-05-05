// This is server side webpack config. If you take a look at 
// the export statement you can see it is using webpack merge
// to merge the webpack.base.js with this webpack file

const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

// *************************************************************
// Webpack config used for our server side code. 
// *************************************************************

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our server application
  entry: './src/index.js',

  // Tell webpack where to put the output file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // Since we are running on server side, tell webpack not to bundle
  // anything into output bundle that exists in the node-modules folder.
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
