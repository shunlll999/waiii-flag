require("dotenv").config()
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const api = require('./api');

const posrt = 3003;
app.use(cors());
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/api', api);

app.listen(posrt, () => {
  console.log(`Example app listening on port ${posrt}!`);
});
