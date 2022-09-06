
const { response } = require("express");
const express = require("express")
const bodyParser = require('body-parser')
const https = require('node:https');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")

})
app.post("/", (req, res) => {

    const query = req.body.CityName;
    const apiKey = "5739fb9a66655e65d678f924a581648f";
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data);
            console.log(weatherdata);
            const temp = weatherdata.main.temp;
            const description = weatherdata.weather[0].description;
            console.log(description);

            res.write(`<h1 style="text-align: center; color: #820000; background-color:#9ED2C6;">The weather is currently : " ${description}"</h2>`)
            res.write(` <h1 style="text-align: center; color: #820000;background-color:#9ED2C6;"> The temparature is :<nobr>${temp}°C</nobr>  </h1> `)

            res.send()
        })

    })
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})