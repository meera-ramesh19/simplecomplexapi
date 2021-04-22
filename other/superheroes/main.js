document.querySelector("button").addEventListener("click", getit);

function getit() {
  const inputVal = document.querySelector("input").value;

  const url =
    "https://superheroapi.com/api/1766416260187036/search/=" + inputVal;
  // "https://api.spoonacular.com/recipes/716429/information?apiKey=b384c1dbb2b2468181829e99308c714a&aiisle=" +
  // inputVal;
  // "https://www.themealdb.com/api/json/v1/1/filter.php?c=&key=1" + inputVal;

  console.log(inputVal);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // document.querySelector("h2").innerHTML = data.meals[random].strMeal;
      // document.querySelector("img").src = data.meals[random].strMealThumb;
      // document.querySelector("h3").innerHTML = data.meals.favorites;
      docuemnt.querySelector("h2").innerHTML = data.results[0].name;
      document.querySelector("img").src = data.image.url;
      document.querySelector(h3);
    })
    .catch((err) => {
      console.log(`error  ${err}`);
    });
}
