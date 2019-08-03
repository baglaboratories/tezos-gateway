const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const favicon = require('serve-favicon');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, '../../client/public/img/favicon/', 'favicon.ico')));

// serve up public folder
app.use(express.static(path.join(__dirname, '/../../client/public')));

app.all('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/public/index.html'));
});

// set port
app.set('port', (process.env.PORT || 8000));

// export our app for testing
module.exports = app;
