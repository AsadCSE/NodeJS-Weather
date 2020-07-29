const path = require('path');
const express = require('express');
const hbs = require ('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');
const { request } = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'../public')));
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

//routes
app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Asad' 
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About',
        name: 'Asad'
    });
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({Error: 'no address found'});
    }
    geoCode(req.query.address, (error,geoData) =>{
        if(error){return res.send({Error: error});
        } else {
            forecast(geoData,(error, weatherData) => {
                if(error){
                    return res.send({
                        Error: error
                    });
                } else {
                    res.send({geoData,weatherData});
                }
            })
        }
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMsg: '404 Page not Found',
        name: 'asad'
    });
})

app.listen(port, ()=>{
    console.log('server is up at ' + port);
});