const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const successMessage = document.querySelector('#successMessage');
const errorMessage = document.querySelector('#errorMessage');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    successMessage.textContent = 'fetching...';
    errorMessage.textContent = '';
    fetch('http://192.168.1.104:3000/weather?address='+location).then((response) =>{
        response.json().then((data) => {
            if(data.Error){
                errorMessage.textContent = data.Error;
            } else {
                successMessage.textContent = data.geoData.location + '\n' + data.weatherData.temperature;
            }
        })
    })
})