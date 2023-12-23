require("dotenv").config();
require('./config/database').connect();
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const api = require('./api');
const public = require('./welcome');

const posrt = process.env.API_PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/api', api);
app.use('/', public);


app.listen(posrt, () => {
  console.log(`Example app listening on port ${posrt}!`);
});
