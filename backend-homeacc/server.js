const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const port = 3003;
const hostname = "127.0.0.1";

const cors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

const entryRoutes = require('./routes/entryRoutes');
const { camelCase } = require('lodash');
app.use(entryRoutes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});