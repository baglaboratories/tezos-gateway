const dotenv = require('dotenv');
const path = require('path');
const https = require('https');
const fs = require('fs');

dotenv.config();
const app = require('./config/server.js');

https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, 'localhost+1-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'localhost+1.pem')),
}, app).listen(app.get('port'));

console.log('Listening on port:', app.get('port'), `in ${process.env.NODE_ENV} mode`);
