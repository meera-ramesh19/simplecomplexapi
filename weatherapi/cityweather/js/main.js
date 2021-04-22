document.querySelector("button").addEventListener("click", getit);

function getit() {
  const inputVal = document.querySelector("input").value;

  const url =
    "https://api.openweathermap.org/data/2.5/find?appid=xxxxxxxxxxxxxxxxxxxxxxxx&units=imperial&q=" +
    inputVal;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.list);

      // d.toISOString();
      // let d = new Date(new Date().getTime() - data[0].timezone * 1000);
      // document.querySelector(".timezone").innerHTML =
      //   "Local time and date is " + d.toISOString();
      for (let i = 0; i < 100; i++) {
        // data.list[0].forEach((elem, idx) => {
        setTimeout(() => {
          document.querySelector("h2").innerHTML =
            data[i].name + "&nbsp;&nbsp;&nbsp;" + data[i].sys[0].country;
          var tempvar = data[i]["weather"][0]["icon"];
          document.querySelector("img").innerHTML =
            "https://openweathermap.org/img/w/" +
            data[i]["weather"][0]["icon"] +
            ".png' alt='Icon depicting current weather.'>";

          document.querySelector(".dates").innerHTML =
            "<span> Temperature : </span>" +
            data[i].main.temp +
            "<sup>&deg;<sup>" +
            "<span>F</span>" +
            "&nbsp;&nbsp;&nbsp; <span> Feels Like : </span>" +
            data[i].main.feels_like +
            "<sup>&deg;<sup>" +
            "span>F</span>";

          document.querySelector(".minmax").innerHTML =
            "Min temp" +
            data[i].main.temp_min +
            "<sup>&deg;<sup>" +
            "F" +
            "&nbsp;&nbsp;&nbsp; Max temp:" +
            data[i].main.temp_max +
            "<sup>&deg;<sup>" +
            "F";
          "&nbsp;&nbsp; Humidity:" + data[i].main.humidity + "100 &percnt";
          document.querySelector(".speed").innerHTML =
            "<span> Wind speed: &nbsp;" +
            data[i].wind.speed +
            "</span> <span> Weather desc:</span> " +
            data[i].weather[i].description;

          //           document.querySelector(".sun").innerHTML =
          //             "Sunrise time : " +
          //             data[i].sys.sunrise +
          //             "&nbsp;&nbsp; Sunset time: " +
          //             data[i].sys.sunset;
        }, i * 3000);
        // });
      }
    })
    .catch((err) => {
      console.log(`error  ${err}`);
    });
}

// city country
// date
// img
// degree now
// min and max windspeed
// // d = new Date()
// localTime = d.getTime()
// localOffset = d.getTimezoneOffset() * 60000
// utc = localTime + localOffset
// var atlanta = utc + (1000 * -14400)
// nd = new Date(atlanta)

// // Mon Jun 15 2020 17:07:59 GMT-0700
// Basically followed these steps:

// Obtain current local time
// Find local time offset
// Obtain current UTC time
// Obtain destination city's offset in hours and convert to milliseconds
// convert to readable format
// Share
