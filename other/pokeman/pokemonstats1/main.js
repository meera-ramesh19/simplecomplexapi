//Example fetch using pokemonapi.co
const pokeBox = document.querySelector(".poke-box");
const leftBox = document.querySelector(".left-box");
const butan = document.querySelector(".btn");

const pokeName = document.querySelector("#poke1");
const pokeEvolve = document.querySelector(".evovleBtn");

butan.addEventListener("click", (e) => {
  e.preventDefault();
   pokeBox.innerHTML="";
  console.log(getPokemon(pokeName.value));
});

async function getPokemon(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  console.log(res);
  const pokemon = await res.json();
  console.log(pokemon);
  const idNo = pokemon.id;

  const pokeList = document.createElement("div");
  pokeList.classList.add("pokemon");

  if (name === pokemon.name) {
    pokeList.innerHTML = `  <div class="pokemonInfo" >
 <img class="pic" src="https://pokeres.bastionbot.org/images/pokemon/${
   pokemon.id
 }.png" width="100">
<p class="p1">id : ${pokemon.id}</p>
<p  class="p2">name : ${pokemon.name}</p>
<p  class="p3">height: ${pokemon.height}</p>
 <p  class="p4">weight: ${pokemon.weight}</p>
    </div>

 <div class="stats">
 ${pokemon.stats
   .map((stat) => {
     return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
   })
   .join("")}

    </div>

    <div class="abilities">
  ${pokemon.abilities
    .map((able) => {
      return `<p>${able.ability.name}</p>`;
    })
    .join("")}
    <div>

    <div class="types">
     types :
     ${pokemon.types
       .map((type) => {
         return `<span>${type.type.name}</span> `;
       })
       .join(", ")}
   <div>
   <p></p>`;

    const reset = pokeName;
    reset.addEventListener(
      "mouseover",
      function (event) {
        // highlight the mouseover target
        event.target.value = "";

        setTimeout(function () {
          pokeBox.innerHTML='';
          //           // event.target.background.color = "";
         // document.querySelector(".stats").innerHTML = "";
          // document.querySelector(".types").innerHTML = "";
         // document.querySelector(".abilities").innerHTML = "";//

          // document.querySelector(".p1").innerHTML = "";
          // document.querySelector(".p2").innerHTML = "";
          // document.querySelector(".p3").innerHTML = "";
          // document.querySelector(".p4").innerHTML = "";

          //document.querySelector(".pic").style.display = "";

         // document.querySelector(".pokemonInfo").innerHTML = "";
          // document.querySelector(".pokemonInfo").style.background = "";

        }, 500);
      },
      false
    );
    pokeBox.appendChild(pokeList);
  } else {
    pokeList.innerHTML = `<div class="pokemonInfo">

   <h3> Sorry!!Your pokemon stats are not available</h3>
   </div>`;
    pokeBox.appendChild(pokeList);
  }

  //   async function getPokeId(Nos) {
  //     const result = await fetch(
  //       `https://pokeapi.co/api/v2/evolution-chain/${Nos}/`
  //     );
  //     console.log(result);
  //     const pokeEvolved = await result.json();
  //     console.log(pokeEvolved);
  //   }

  //   pokeEvolve.addEventListener("click", function () {
  //     getPokeId();
  //   });
  // getPokeId();
}

getPokemon();

// for evolution
// https://pokeapi.co/api/v2/evolution-chain/{id}/
