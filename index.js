const express = require('express');
const body = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs');

app.use(body.urlencoded({extended:true}));

app.get('/',(req,res)=>{

    res.render('html',{t: null, h: null, d:null, w:null, i:null});

})

app.post('/', async(req,res)=>{

    const city = req.body.cityName;
    const apiKey = '6d423acbdd4892463a94ebe7ba270b80'
    const urlLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

   
    try {

        const response = await fetch(urlLink);
        const weatherData = await response.json();

        if(response.ok){
            const temprature = Math.round(weatherData.main.temp);
            const humidity = weatherData.main.humidity;
            const description = weatherData.weather[0].description;
            const wind = Math.round(weatherData.wind.speed);
            const iconCode = weatherData.weather[0].icon;
            const icon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
            res.render('html',
                {
                    t: temprature,
                    h: humidity,
                    d: description,
                    w: wind,
                    i: icon
                }
            )
        }
        else{
            res.render('html',
                {
                    t: "0",
                    h: null,
                    d: null,
                    w: null,
                    i: null
                }
            )
        }

    } catch (error) {

        console.log(error);

        res.render('html', { t: "Err", h: null, d: null, w: null, i: null });
    }
    
})

app.listen(10000, console.log("Running"));

