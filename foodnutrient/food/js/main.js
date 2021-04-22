document.querySelector("button").addEventListener("click", getphotos);

function getphotos() {
  const names = document.querySelector("input").value;
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + names;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector("h2").innerHTML = data.meals[0].strMeal;
      document.querySelector("img").src = data.meals[0].strMealThumb;
      document.querySelector("h3").innerHTML = data.meals[0].idMeal;
    })
    .catch((err) => {
      console.log(`error  ${err}`);
    });
}

// fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     for (i = 0; i < data.length, i++; ) {
//       let queryArea = data.meals[i].strArea;
//       if (queryArea === area) {
//         document.querySelector("h1").innerText = queryArea;
//       }
//     }
//   })
//   .catch((err) => {
//     console.log(`error  ${err}`);
//   });
