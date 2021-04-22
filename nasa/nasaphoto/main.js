//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
document.querySelector("button").addEventListener("click", getphotos);

function getphotos() {
  const dateVal = document.querySelector("input").value;
  const url =
    "https://api.nasa.gov/planetary/apod?api_key=W8ituvMovkY92eRC3IWJwlJSxgmpeLHfMI6xbOfJ&date=" +
    dateVal;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let todayDate = data.date;
      let explain = data.explanation;
      let hdImage = data.hdurl;
      document.querySelector("h2").innerText = todayDate;
      document.querySelector("img").src = hdImage;
      document.querySelector("h3").innerText = explain;
    })
    .catch((err) => {
      console.log(`error  ${err}`);
    });
}
