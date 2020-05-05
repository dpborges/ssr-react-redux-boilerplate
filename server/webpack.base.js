// Below is the base configuration rules that are common to both the
// client side and server side webpack config files. Each of the webpack 
// config files, must use the webpack merge module to merge this base config 
// their own configuration. Take a look at webpack.client.js and webpack.server.js 
// to see how webpack merge use used.

module.exports = {
  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',   /* babel-loader transpiles our code */
        exclude: /node_modules/,
        options: {                /* babel-loader options */
          presets: [
            'react',              /* converts JSX to javascript */
            'stage-0',            /* used to handle async code  */
            ['env', { targets: { browsers: ['last 2 versions'] } }] /* handle transpile rules for last 2 browser versions */
          ]
        }
      }
    ]
  }
};
  