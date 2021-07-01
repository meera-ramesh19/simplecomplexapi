document.querySelector("button").addEventListener("click", getit);

function getit() {
  const location = document.querySelector("input").value;

  const url =
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=d40f4f9027fc1080c61b38f611235477&q=" +
    location;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var tempvar = data.weather[0].icon;

      document.querySelector("h3").innerHTML =
        data.name +
        "&nbsp;&nbsp;&nbsp;" +
        data.sys.country +
        "<br><span>Latitude:</span> " +
        data.coord.lat +
        "&nbsp&nbsp&nbsp&nbsp;<span>Longitude:</span>" +
        data.coord.lon;
      // var tempvar = data.weather[0].icon;
      console.log(lon, lat);
      console.log(tempvar);
      //     var listtoggle;
      //       document.getElementById("apps").classList.remove(".snowy");
      //       document.getElementById("apps").classList.remove(".clear");
      //       document.getElementById("apps").classList.remove(".cloudy");
      //       document.getElementById("apps").classList.remove(".rainy");
      //       document.getElementById("apps").classList.remove(".misty");
      //       document.getElementById("apps").classList.remove(".thunder");
      //       if (tempvar === "01d" || tempvar === "01n") {
      //        listtoggle= document.getElementById("apps").classList.toggle(".clear");
      //       } else if (
      //         tempvar === "02d" ||
      //         tempvar === "02n" ||
      //         tempvar === "03d" ||
      //         tempvar === "03n" ||
      //         tempvar === "04d" ||
      //         tempvar === "04n"
      //       ) {
      //         listtoggle=  document .getElementById("btn")
      //           .classList.toggle(".cloudy");
      //       } else if (tempvar === "09d" || tempvar === "09n") {
      //        listtoggle=  document.getElementById("apps").classList.toggle(".rainy");
      //       } else if (tempvar === "50d" || tempvar === "50n") {
      //         listtoggle= document.getElementById("apps").classList.toggle(".misty");
      //       } else if (tempvar === "13d" || tempvar === "13n") {
      //       listtoggle=   document.getElementById("apps").classList.toggle(".snowy");
      //       } else {
      //        listtoggle=  document.getElementById("apps").classList.toggle(".thunder");
      //       }

      //       console.log(listtoggle);
      let image = "https://openweathermap.org/img/wn/" + tempvar + "@2x.png";

      document.querySelector(".dates").innerHTML =
        "<span> Weather desc:</span> " +
        data.weather[0].description +
        " <br><img id='temp-icon' src='" +
        image +
        "' />" +
        "<br><span> Temperature </span>" +
        data.main.temp +
        "<sup>&deg;</sup>" +
        "<span>F</span> " +
        "<br> <span> Feels Like : </span>" +
        data.main.feels_like +
        "<sup>&deg;</sup>" +
        "<span>F</span>";

      document.querySelector(".minmax").innerHTML =
        "Min temp:" +
        data.main.temp_min +
        "<sup>&deg;</sup>" +
        "<span>F</span>" +
        "&nbsp&nbsp&nbsp&nbsp;Max temp:" +
        data.main.temp_max +
        "<sup>&deg;</sup>" +
        "<span>F</span>";
      "<br> Humidity:&nbsp&nbsp&nbsp&nbsp;" +
        data.main.humidity +
        "100 &percnt";
      document.querySelector(".speed").innerHTML =
        "<br><span> Wind speed: &nbsp&nbsp&nbsp&nbsp;" + data.wind.speed;
      ("</span> ");

      document.querySelector(".sun").innerHTML =
        "Sunrise: " +
        timeConverter(data.sys.sunrise) +
        "&nbsp&nbsp&nbsp;Sunset: " +
        timeConverter(data.sys.sunset);

      /* 7 day forecast code*/
      console.log(lon, lat);
      /* fetch code for 7day forecast*/
      var endpoint =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=current,hourly,minutely,alerts&units=imperial&appid=d40f4f9027fc1080c61b38f611235477";
      console.log(endpoint);
      var forecastEl = document.getElementsByClassName("forecast");

      fetch(endpoint)
        .then(function (response) {
          if (200 !== response.status) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          forecastEl[0].classList.add("loaded");

          response.json().then(function (data) {
            var fday = "";
            // const { main, name, sys, weather } = data;
            console.log(data);
            data.daily.forEach((value, index) => {
              console.log(value);
              if (index > 0) {
                var dayname = new Date(value.dt * 1000).toLocaleDateString(
                  "en",
                  {
                    weekday: "long"
                  }
                );
                var weather = value.weather[0].description;
                var maxTempF = value.temp.max;
                var minTempF = value.temp.min;
                var iconsImg = value.weather[0].icon;
                let image =
                  "https://openweathermap.org/img/wn/" + iconsImg + "@2x.png";
                var daydates = timeConverter(value.dt);
                daydates = daydates.split(" ")[0];
                var temp = value.temp.day.toFixed(0);

                fday = `<div class="sevenday">
                <div class="card">
                            <div class="card-body">
                						<p class="title">${dayname}<span>&nbsp&nbsp;${daydates}</span></p>
                             <p><img class="icon" src='${image}' /></p>
                              <p class="wx">${weather}</p>
                           <p class="temps">
                           <span>High:</span>${maxTempF}<sup>°F</sup><span>&nbsp&nbsp&nbsp&nbsp;Low:</span>${minTempF}<sup>°F</sup></p>
                           </div>
                					</div>`;
                forecastEl[0].insertAdjacentHTML("afterbegin", fday);
              }
            });
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });

      /*7 day forecast code ends here*/
      // }, i * 3000);
      //   });
      // }
    })
    .catch((err) => {
      console.log(`error  ${err}`);
    });
}

function timeConverter(conversiontime) {
  var a = new Date(conversiontime * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    month + "/" + date + "/" + year + " " + hour + ":" + min + ":" + sec;
  return time;
}
/** 7day forecast**/
// var weather;

// if ("IntersectionObserver" in window) {
//   weather = document.querySelectorAll(".weather");

//   var weatherObserver = new IntersectionObserver(
//     function (entries, observer) {
//       entries.forEach(function (entry) {
//         if (entry.isIntersecting) {
//           if (entry.target.classList.contains("weather")) {
//             fetchForecast();
//           }
//         }
//       });
//     },
//     {
//       rootMargin: "0px 0px -120px 0px"
//     }
//   );

//   weather.forEach(function (s) {
//     weatherObserver.observe(s);
//   });
// }
