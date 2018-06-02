const express = require('express');
const { resolve } = require('path');
const { urlencoded, json } = require('body-parser');
const home = require('./home');
const about = require('./about');
const contact = require('./contact');

const app = express();
const host = process.env.YOUR_HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.set('views', resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(json());
app.use(urlencoded({extended: false}));
app.use('/public', express.static(resolve(__dirname, 'public')));
app.use('/vendor', express.static(resolve(__dirname, 'node_modules/bootstrap/dist')));

app.use('/', home);
app.use('/contact', contact);
app.use('/about', about);

app.listen(port, host, () => {
    console.info(`App listening on port ${host}:${port}!`);
});
