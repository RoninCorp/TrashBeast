var fs = require('fs');

class LatLng {
    constructor( ){
        this.lat = 0;
        this.lang = 0;
    }
    stringToDouble(latlng){
        latlng = latlng.replace( />/g ,"");
        latlng = latlng.replace( /</g ,"");
        latlng = latlng.replace( /\r/g ,"");
        latlng = latlng.replace( / /g ,"");
        // this.latLang.replace('/</g',"");
        // this.latLang.replace('/\r/g',"");
        console.log(latlng + '  REPLACED LAT LNG');
        var arr = latlng.split(",");
        this.lat = parseFloat(arr[0]);
        this.lang = parseFloat(arr[1]);
    }
}

class Point {
    constructor(origin , destination , distance ){
        this.origin = origin ;
        this.destination = destination;
        this.distance = distance ;
    }
}

var arrObj = new Array;
var data = new Array ;
fs.readFile('data.txt', 'utf8', function(err, contents) {
    if(err){
        console.log(err);
    }
    console.log(contents);

    //Split on each object
    data = contents.split('\n');
    // console.log(data);
      console.log(data.length);

   //Iterating through points.
    data.forEach((val)=>{
       //Create new object  for each item in the txt file.
        console.log(val);

        var attr = val.split(';');
        //console.log("ATTR   +++++++++++   " +attr);
        if (attr.length > 1 ){
        var attrArr = attr[0].split(':');
        //console.log("ATTR ARR +++++++++++   " + attrArr);
        //console.log(attrArr);
        var latlong =  new LatLng();
        latlong.stringToDouble(attrArr[1]);
        var origin = {name : attrArr[0] , location:  latlong};


        attrArr  = attr[1].split(':');
        latlong =  new LatLng();
        latlong.stringToDouble(attrArr[1]);
        var destination = {name : attrArr[0] , location:  latlong};

        attrArr = attr[2].split(':');

        var distance =  parseFloat(attrArr[1].replace(/ /g,"").replace(/</g,"").replace(/>/g,""));

        var obj = new Point(origin,destination,distance);
        arrObj.push(obj);}
    });

    console.log(arrObj);
    console.log(arrObj.length);
    extractFile();
});
function extractFile(){
fs.writeFile('./dataExtract.json' ,JSON.stringify(arrObj,null,2) , (err)=>{
    if(err){
        console.log(err);

    }else {
        console.log("File is extracted");
    }
});
}
//console.log(data);
console.log('after calling readFile');