// import env file
require('dotenv').config();

const express = require('express');
const app = express();
// heroku port default 80
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.send(process.env.VARIABLE_ONE);
});

app.listen(port, () => {
    console.log(`Example app at port ${port}`);
});
