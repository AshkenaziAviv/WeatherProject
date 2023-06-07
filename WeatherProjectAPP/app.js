const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "4b651b9553a6c9806946fbb610e5fe29";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units +
    "";

  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const watherData = JSON.parse(data);
      const temp = watherData.main.temp;
      const description = watherData.weather[0].description;
      const icon = watherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp, description);
      res.write(
        "<h1>The Temerature in " +
          query +
          " is " +
          temp +
          "degree Celcius.</h1>"
      );

      res.write(
        "<h2>The Description in " + query + " is " + description + ".</h2>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
