const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const successMessage = document.querySelector('#successMessage');
const errorMessage = document.querySelector('#errorMessage');
const logo = document.querySelector('#weatherLogo');
const locationP = document.querySelector('#locationP');
const latlonData = document.querySelector('#latlonData');
const weatherDesc = document.querySelector('#weatherDesc');
const tempP = document.querySelector('#tempP');
const tempD = document.querySelector('#tempD');
const humP = document.querySelector('#humP');
const humD = document.querySelector('#humD');
const feelP = document.querySelector('#feelP');
const feelD = document.querySelector('#feelD');
const winP = document.querySelector('#winP');
const winD = document.querySelector('#winD');
const uvP = document.querySelector('#uvP');
const uvD = document.querySelector('#uvD');
const wlogoBanner = document.querySelector('#wlogoBanner');


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    
    successMessage.textContent = 'fetching...';
    errorMessage.textContent = '';
    locationP.textContent = '';
    logo.setAttribute('src', '');
    latlonData.textContent = '';
    weatherDesc.textContent = '';
    tempP.textContent = '';
    tempD.textContent = '';
    humP.textContent = '';
    humD.textContent = '';
    feelP.textContent = '';
    feelD.textContent = '';
    winP.textContent = '';
    winD.textContent = '';
    uvP.textContent = '';
    uvD.textContent = '';
    wlogoBanner.style.backgroundColor = '#FFFFFF';

    fetch('/weather?address='+location).then((response) =>{
        response.json().then((data) => {
            if(data.Error){
                errorMessage.textContent = data.Error;
            } else {
                successMessage.textContent = '';
                locationP.textContent = data.geoData.location;
                wlogoBanner.style.backgroundColor = '#FFF8E7';
                logo.setAttribute('src', data.weatherData.icon);
                latlonData.textContent = 'Latitude: '+data.geoData.latitude+'  |  Longitude: '+data.geoData.longitude;
                weatherDesc.textContent = data.weatherData.weather;
                tempP.textContent = 'Temperature';
                tempD.textContent = data.weatherData.temperature + '°C';
                humP.textContent = 'Humidity';
                humD.textContent = data.weatherData.humidity + '%';
                feelP.textContent = 'Feels like';
                feelD.textContent = data.weatherData.feelslike + '°C';
                winP.textContent = 'Wind';
                winD.textContent = data.weatherData.wind_speed + ' KMPH ' +data.weatherData.wind_dir;
                uvP.textContent = 'UV Index';
                uvD.textContent = data.weatherData.uv_index;
            }
        })
    })
})