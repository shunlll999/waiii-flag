const express = require('express');
const cors = require('cors')
const cookieSession = require('cookie-session');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const home = require('./home');
const api = require('./api');
const auth = require('./auth');

const posrt = 3003;
app.use(cors());
app.use(express.static('public'))
app.use(expressLayouts);

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use('/home', home);
app.use('/api', api);
app.use('/auth', auth);

app.listen(posrt, () => {
  console.log(`Example app listening on port ${posrt}!`);
});
