document.querySelector("button").addEventListener("click", getFetch);

function getFetch() {
  const choice = document.querySelector("input").value;

  const url = fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": "31c0d165",
      "x-app-key": "8637eb84b2f8b122673898846f1cf458",
      "x-remote-use-id": "0"
    },
    body: JSON.stringify({ query: choice, timezone: "US/Eastern" })
  })
    .then((res) => res.json()) // parse response 'as JSON
    .then((data) => {
      console.log("Success:", data);
      document.querySelector("h2").innerHTML = data.foods[0].food_name;
      document.querySelector("h3").innerHTML = data.foods[0].ndb_no;
      document.querySelector("img").src = data.foods[0].photo.highres;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
