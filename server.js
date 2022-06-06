const express = require('express');
const path = require('path');   
const fs = require('fs');
const util = require('util');
const uuid = require('./helpers/uuid');
const PORT = 3001;

const app = express();

//express app data data parsing setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//helper funcs for appending to db - copy pasted from instructor files 11-Express/01-Activities/21-Ins-Modular-Routing/server.js
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

//app.gets

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//app.posts

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid()
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note saved succesfully!')
    } else {
        res.error('Error in saving note');
    }
})


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});