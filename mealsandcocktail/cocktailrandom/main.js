document.querySelector("button").addEventListener("click", getit);

function getit() {
  const inputVal = document.querySelector("input").value;

  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + inputVal;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let random = Math.floor(Math.random() * 5);
      //console.log(data.drinks[0])
      // let drinkname=data.drinks[0].strDrink
      // let drinkThumb=data.drinks[0].strDrinkThumb
      // let drinkInst=data.drinks[0].strInstructions
      let drinkname = data.drinks[random].strDrink;
      let drinkThumb = data.drinks[random].strDrinkThumb;
      let drinkInst = data.drinks[random].strInstructions;
      document.querySelector("h2").innerText = drinkname;
      document.querySelector("img").src = drinkThumb;
      document.querySelector("h3").innerText = drinkInst;
    })
    .catch((err) => {
      console.log(`error  ${err}`);
    });
}
