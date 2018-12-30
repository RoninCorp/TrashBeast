const express = require('express');
const path = require("path");
const fs = require("fs");
const formidableMiddleware = require('express-formidable');
const formidable = require('formidable');
const bodyParser = require('body-parser');

const app = express();

app.use(formidableMiddleware(
    {
        encoding: 'utf-8',
        uploadDir: './uploads',
        multiples: true, // req.files to be arrays of files
    }
));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/assets'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'assets')));

app.get("/api", (req, res) => {
    res.send("underConstruction");
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get("/upload", (req, res) => {
    res.sendFile('upload.html' , { root: path.join(__dirname, 'public') });
});

app.post('/upload', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file) {
        file.path = __dirname + file.name + file.type;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
    });
    const fileReader = require('./fileReader');
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server started");
});