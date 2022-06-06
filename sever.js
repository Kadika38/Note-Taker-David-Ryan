const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

//express app data data parsing setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//app.gets

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});