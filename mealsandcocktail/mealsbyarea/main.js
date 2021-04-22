
document.querySelector("button").addEventListener("click", getit);

function getit() {
  const inputVal = document.querySelector("input").value;
  let random = Math.floor(Math.random() * 5);

  const url =
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + inputVal;
  // "https://www.themealdb.com/api/json/v1/1/random.php" +
  console.log(inputVal);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector("h2").innerHTML = data.meals[random].strMeal;
      document.querySelector("img").src = data.meals[random].strMealThumb;
      document.querySelector("h3").innerHTML = data.meals.favorites;
    })
    .catch((err) => {
      console.log(`error  ${err}`);
    });
}
