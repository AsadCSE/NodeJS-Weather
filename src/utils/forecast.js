const request = require('request');
module.exports =  forecast = (geoData, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5c30f279697fd9b790c729242c33ef9e&query=' + geoData.latitude + ',' + geoData.longitude;
    request({url:url, json:true}, (error,response) => {
        if(error){
            callback('Unable to connect to weather',undefined);
        } else if (!response.body.current){
            callback('Weather not found',undefined);
        } else {
            callback(undefined,{
                weather     : response.body.current.weather_descriptions[0],
                temperature : response.body.current.temperature,
                humidity    : response.body.current.humidity,
                feelslike   : response.body.current.feelslike,
                wind_speed  : response.body.current.wind_speed,
                wind_dir    : response.body.current.wind_dir,
                uv_index    : response.body.current.uv_index
            });
        }
    });
};