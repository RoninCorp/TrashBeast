const fs = require('fs');
const path = "./uploads";
const LatLng = require ("./helpers/LatLng");
const Point = require("./helpers/Point");

var arrObj = new Array;
var data = new Array;

function renameUploadedFiles() {
    fs.readdir(path, function (err, items) {
        console.log(items);
        if (items.length === 0) {
            console.log(`${path} directory is empty.`)
        }
        else {
            for (var i = 0; i < items.length; i++) {
                console.log(items[i]);
                // fs.rename(".\\uploads\\" + items[i], "./renamed/" + i + ".txt", (err) => {
                //     if (err) throw err;
                //     console.log("Rename Completed.");
                // });
            }
        }
        createJsonFiles(items);
    });
}

function createJsonFiles(files) {

    files.forEach((file,index)=>{
        fs.readFile('./uploads/'+file, 'utf8', function (err, contents) {
            if (err) {
                console.log(err);
            }
            //Split on each object
            data = contents.split('\n');
            // console.log(data);
            //Iterating through points.
            data.forEach((val) => {
                var attr = val.split(';');
                if (attr.length > 1) {
                    var attrArr = attr[0].split(':');
                    var latlong = new LatLng();
                    latlong.stringToDouble(attrArr[1]);
                    var origin = {name: attrArr[0], location: latlong};
                    attrArr = attr[1].split(':');
                    latlong = new LatLng();
                    latlong.stringToDouble(attrArr[1]);
                    var destination = {name: attrArr[0], location: latlong};
                    attrArr = attr[2].split(':');
                    var distance = parseFloat(attrArr[1].replace(/ /g, "").replace(/</g, "").replace(/>/g, ""));
                    var obj = new Point(origin, destination, distance);
                    arrObj.push(obj);
                }
            });
            extractFile(index);
        });
    });
    deleteUploadedFiles();
}

function extractFile(index) {
    fs.writeFile("./dataParsed/dataExtract"+index+".json", JSON.stringify(arrObj, null, 2), (err) => {
        if (err) {
            console.log(err);

        } else {
            console.log("File is extracted");
        }
    });
}

function deleteUploadedFiles(){
    fs.readdir(path, function (err, items) {
        console.log(items);
        if (items.length === 0) {
            console.log(`${path} directory is empty.`)
        }
        else {
            for (var i = 0; i < items.length; i++) {
                console.log(items[i]);
                fs.unlink(path +"/" + items[i], (err) => {
                    if (err) throw err;
                    console.log('successfully deleted uploaded files ');
                });
            }
        }

    });
}


module.exports = renameUploadedFiles();