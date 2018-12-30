var express = require('express');
var path = require("path");
var fs = require("fs");
var formidableMiddleware = require('express-formidable');
var formidable = require('formidable');

var app = express();


app.use(formidableMiddleware(
    {
            encoding: 'utf-8',
            uploadDir: './uploads',
            multiples: true, // req.files to be arrays of files
        }
) );
const data = require('./dataExtract');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/api",(req,res)=>{
// res.header("Content-Type",'application/json');
// res.send(JSON.stringify(data));
    res.json(data);
});

app.get('/',(req,res)=>{
   res.sendFile('index.html');
});

app.post('/upload',(req,res)=>{
    var form = new formidable.IncomingForm();

    form.parse(req);
var filename;
    form.on('fileBegin', function (name, file){
        file.path = __dirname + file.name +file.type;

    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        fs.rename(__dirname + file.name , '/uploads/file.txt', function (err) {
            if (err) throw err;
            console.log('renamed complete');
        });
    });

    res.send('hellp');
});

app.listen(3000 , ()=>{
    console.log("server started");
});