const { readFileSync } = require('fs');
const { resolve } = require('path');
const { safeLoad } = require('js-yaml');

const path = resolve(__dirname, './mail.yml');
const file = readFileSync(path, 'utf8');
const config = safeLoad(file);

module.exports = config;
