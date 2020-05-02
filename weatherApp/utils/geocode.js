request = require("postman-request")

const geocode = (geoAddress,callback) => {
    const urlGeocoding = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + geoAddress +".json?access_token=pk.eyJ1Ijoic2Fuaml0NzciLCJhIjoiY2s5b2FtNHFiMGF0ODNnbWU2bnVuNHNoNSJ9.8caqd9hdR0bPEO0j9HGQeg&limit=1"
    request({url: urlGeocoding, json:true}, (error, response) => {
        if (error){
            callback(error, undefined)
        }
        else if (response.body.features.length === 0){
            callback("No such location found. Please try again.",undefined)
        }
        else{
            callback(undefined, {
                lattitude: response.body.features[0].geometry.coordinates[0],
                longitude: response.body.features[0].geometry.coordinates[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode