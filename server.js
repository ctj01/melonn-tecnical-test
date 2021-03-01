const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./Controller/OrderRoute')(app, fs)

const server = app.listen(5001, () => {
    console.log("listening on port %s", server.address().port)
})