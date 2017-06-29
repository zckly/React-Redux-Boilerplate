const express = require('express');
const path = require('path');
const compression = require('compression');
const logger = require('morgan');
const request = require('request');
const qs = require('querystring');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const DashboardPlugin = require('webpack-dashboard/plugin');
const historyApiFallback = require('connect-history-api-fallback');

const config = require('../webpack.config.js');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const port = !isProduction ? 8080 : process.env.PORT;
const app = express();
const compiler = webpack(config);
// compiler.apply(new DashboardPlugin());
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: isProduction ? './build' : './src',
  historyApiFallback: true,
  compress: isProduction,
  inline: !isProduction,
  hot: !isProduction,
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: {
      green: '\u001b[32m',
    },
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

//Route

app.post('/schedule/week', function(req, res) {
  //Input: 
    //req.body.startDate is the string starting date requested by the user.
    //req.body.endDate is the string ending date.
  //Purpose:
    //This function takes the requested schedule by the client and 
    //makes a request to Qgenda Api. It expects an array of objects
    //as response. It then takes that response and sends the array 
    //to the client.
  //Create the query string requested by the Qgenda API.
  var query = qs.stringify({
    companyKey: config.api_key,
    email: config.api_email,
    password: config.api_pass
    //startDate: req.body.startDate,
    //endDate: req.body.endDate
  })
  console.log('query', query)
  //Make the request to the Qgenda API.
  var url = 'https://api.qgenda.com/v1/schedule?' + query

  var realAssURL = 'https://api.qgenda.com/v1/schedule?companyKey=6b9703e0-1b91-4170-a1d6-d0fa711f73fa&startDate=4/17/2017&endDate=4/23/2017&email=HoustonRadITAPI@qgenda.com&password=Houston1';
  request(realAssURL, function(error, response, body) {
    if (error) {
      console.error('Error:', error)
    } else {
      res.status(200).send(body) //Temporary
    }
  })
})

app.get('*', function response(req, res) {
  res.send(path.join(__dirname, 'src/index.html'));
  res.end();
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
  
