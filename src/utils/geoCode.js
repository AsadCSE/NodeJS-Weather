const request = require('request');

module.exports = geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNhZGNzZTI0NyIsImEiOiJja2QzdzFqZzgxcndyMnpteW0yYXNkdmk4In0.fhYRH_KhjMHQ3I8fl6R0eg&limit=1';
    request({url:url, json: true},(error,response)=>{
        if(error){
            callback('unable to connect to locaion', undefined);
        } else if (!response.body.features.length){
            callback('location not found', undefined);
        }else{
            callback(undefined,{
                latitude    : response.body.features[0].center[1].toFixed(3)*1,
                longitude   : response.body.features[0].center[0].toFixed(3)*1,
                location    : response.body.features[0].place_name
            });
        }
    });
};