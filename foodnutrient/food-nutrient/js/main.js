document.querySelector("button").addEventListener("click", getInfo);
// document.querySelector("reset").addEventListener("click", getReset);

let nutrient = null;
function getInfo() {
  nutrient = getphotos();
  if (nutrient == null) {
    console.log("my error: nutrient is null");
  } else {
    console.log("My nutrient is" + nutrient);
  }
  // getNutrition(nutrient);
}
function getphotos() {
  const names = document.querySelector("input").value;
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + names;
  let stat = [];
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      document.querySelector("h2").innerHTML = data.meals[0].strMeal;
      document.querySelector("img").src = data.meals[0].strMealThumb;
      // document.querySelector("h3").innerHTML = data.meals[0].idMeal;
      let choice = data.meals[0].strMeal;
      const url2 = fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "31c0d165",
            "x-app-key": "8637eb84b2f8b122673898846f1cf458",
            "x-remote-use-id": "0"
          },
          body: JSON.stringify({ query: choice, timezone: "US/Eastern" })
        }
      )
        .then((res2) => res2.json()) // parse response 'as JSON
        .then((data2) => {
          console.log("Success:", data2);
          document.querySelector(".nutrient").innerHTML =
            data2.foods[0].food_name;
          document.querySelector("h3").innerHTML = data2.foods[0].ndb_no;
          document.querySelector("#picImg").src = data2.foods[0].photo.highres;

          document.querySelector(".serve1").innerHTML =
            data2.foods[0].serving_qty;

          document.querySelector(".serve2").innerHTML =
            data2.foods[0].serving_weight_grams;
          document.querySelector(".cal").innerHTML = data2.foods[0].nf_calories;
          document.querySelector(".totalfat").innerHTML =
            data2.foods[0].nf_total_fat;
          document.querySelector(".satFat").innerHTML =
            data2.foods[0].nf_saturated_fat;
          document.querySelector(".cholFat").innerHTML =
            data2.foods[0].nf_cholesterol;
          document.querySelector(".sodFat").innerHTML =
            data2.foods[0].nf_sodium;
          document.querySelector(".carbFat").innerHTML =
            data2.foods[0].nf_total_carbohydrate;
          document.querySelector(".fibFat").innerHTML =
            data2.foods[0].nf_dietary_fiber;
          document.querySelector(".sugFat").innerHTML =
            data2.foods[0].nf_sugars;
          document.querySelector(".prot").innerHTML = data2.foods[0].nf_protein;
          //   document.querySelector(".vitA").innerHTML =
          //     data2.foods[0].nf_vitamin_A;
          //   document.querySelector(".vitC").innerHTML =
          //     data2.foods[0].nf_vitamin_C;
          //   document.querySelector(".calc").innerHTML =
          //     data2.foods[0].nf_calcium;
          //   document.querySelector(".iron").innerHTML =
          //     data2.foods[0].nf_iron;
        })
        .catch((err) => {
          console.log(`error ${err}`);
        });
    })
    .catch((err) => {
      console.log(`error  ${err}`);
    });
}
