document.querySelector("button").addEventListener("click", getFetch);

function getFetch() {
  const choice = document.querySelector("input").value;
  const url = "https://pokeapi.co/api/v2/pokemon/" + choice;
  let pokeStr = [];
  let pokeImg = [];
  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      pokeImg.push(data.sprites.front_shiny);
      document.querySelector("img").src = pokeImg;
      for (let i = 0; i < data.moves.length; i++) {
        pokeStr.push(data.moves[i].move.name);
        document.querySelector("h2").innerHTML = pokeStr + "<br>";
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
