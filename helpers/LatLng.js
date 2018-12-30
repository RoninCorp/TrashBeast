class LatLng {
    constructor() {
        this.lat = 0;
        this.lang = 0;
    }
    stringToDouble(latlng) {
        latlng = latlng.replace(/>/g, "");
        latlng = latlng.replace(/</g, "");
        latlng = latlng.replace(/\r/g, "");
        latlng = latlng.replace(/ /g, "");
        // this.latLang.replace('/</g',"");
        // this.latLang.replace('/\r/g',"");
        console.log(latlng + '  REPLACED LAT LNG');
        var arr = latlng.split(",");
        this.lat = parseFloat(arr[0]);
        this.lang = parseFloat(arr[1]);
    }
}

module.exports = LatLng;