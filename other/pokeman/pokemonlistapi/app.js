

// const pokemonNumber = 150;
let pokemonVal = "";
let pokemonObj = {};
let pokeNum = "";
const mainScreen = document.querySelector(".main-screen");
const pokeName = document.querySelector(".poke-name");
const pokeId = document.querySelector(".poke-id");
const pokeFrontImage = document.querySelector(".poke-front-image");
const pokeBackImage = document.querySelector(".poke-back-image");
const pokeTypeOne = document.querySelector(".poke-type-one");
const pokeTypeTwo = document.querySelector(".poke-type-two");
const pokeWeight = document.querySelector(".poke-weight");
const pokeHeight = document.querySelector(".poke-height");
const pokeListItems = document.querySelectorAll(".list-item");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");

const modalBody = document.querySelector(".modal-body");

let prevUrl = null;
let nextUrl = null;

const TYPES = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy"
];
const upper = (str) => str[0].toUpperCase() + str.substr(1);
function fetchPokeList(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const { results } = data;

      prevUrl = data.previous;
      nextUrl = data.next;
      for (i = 0; i < pokeListItems.length; i++) {
        const pokeListItem = pokeListItems[i];
        const result = results[i];

        if (result !== "") {
          const newUrl = result.url.split("/");
          const id = newUrl[newUrl.length - 2];

          pokeListItem.textContent = id + "." + upper(result.name);
        } else {
          pokeListItem.textContent = "";
        }
      }
    });
}

const lastLeftButtonClick = () => {
  if (prevUrl) {
    console.log(prevUrl);
    fetchPokeList(prevUrl);
  }
};
const rightButtonClick = () => {
  if (nextUrl) {
    fetchPokeList(nextUrl);
  }
};

const resetScreen = () => {
  mainScreen.classList.remove("hide");
  for (const type of TYPES) {
    mainScreen.classList.remove(type);
  }
};

function fetchPokeData(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      resetScreen();

      const dataTypes = data["types"];

      const dataFirstType = dataTypes[0];
      const dataSecondType = dataTypes[1];
      // pokeTypeOne.textContent = dataFirstType["type"]["name"];
      //  if (dataSecondType) {
      //    pokeTypeTwo.classList.remove("hide");
      //    pokeTypeTwo.textContent = dataSecondType["type"]["name"];
      //  } else {
      //    pokeTypeTwo.classList.add("hide");
      //   pokeTypeTwo.textContent = "";
      // }
      mainScreen.classList.add(dataFirstType["type"]["name"]);

      pokeName.textContent = upper(data["name"]);
      pokeId.textContent = "#" + data["id"].toString().padStart(3, "0");
      pokeFrontImage.src = data["sprites"]["front_default"];
      // pokeWeight.textContent = data["weight"];
      // pokeHeight.textContent = data["height"];
      // pokeFrontImage.src = data["sprites"]["front_default"] || "";
      // pokeBackImage.src = data["sprites"]["back_default"] || "";
    });
}

const displayStats = (pokeNum) => {
  const showUrl = ` https://pokeapi.co/api/v2/pokemon/${pokeNum}`;
  fetch(showUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let name = data.name;
      let id = data.id.toString().padStart(3, "0");
      let height = data.height;
      let weight = data.weight;
      let imgFront = data.sprites.front_shiny;
      let imgBack = data.sprites.back_shiny;
      console.log(imgFront);
      let pType = data.types.map((type) => type.type.name).join(", ");
      let pStats = data.stats.map((stat) => stat.stat.name).join(", ");
      let pBaseStats = data.stats.map((stat) => stat.base_stat).join(", ");
      let pAbility = data.abilities.map((able) => able.ability.name).join(", ");

      name;
      document.querySelector(".modal-id").innerText = `ID: #${id}`;
      document.querySelector(".modal-name").innerText = `Name: ${upper(name)}`;
      document.querySelector(".modal-front-img").src = `${imgFront}`;
      document.querySelector(".modal-back-img").src = `${imgBack}`;
      document.querySelector(".modal-type").innerText = `Types:${pType}`;
      document.querySelector(".modal-stat").innerText = `Stats: ${pStats}`;
      document.querySelector(
        ".modal-basestat"
      ).innerText = `BaseStats:  ${pBaseStats}`;
      document.querySelector(
        ".modal-ability"
      ).innerText = `Abilities: ${pAbility}`;
    });
};

leftButton.addEventListener("click", lastLeftButtonClick);

rightButton.addEventListener("click", rightButtonClick);

const handleListItemClick = (e) => {
  if (!e.target) return;

  const listItem = e.target;
  console.log(listItem);
  if (!listItem.textContent) return;

  const id = listItem.textContent.split(".")[0];
  // console.log(id);
  // console.log("me " + id);
  pokeNum = id;
  console.log("1" + pokeNum);
  fetchPokeData(pokeNum);
};

for (const pokeListItem of pokeListItems) {
  pokeListItem.addEventListener("click", handleListItemClick);
}

//MODAL POPUPS
// Get DOM Elements
const modal = document.querySelector("#my-modal");
const modalBtn = document.querySelector("#modal-btn");
const closeBtn = document.querySelector(".close");

// Events
modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);
// Open
function openModal() {
  modal.style.display = "block";
  console.log("2" + pokeNum);
  displayStats(pokeNum);
}

// Close
function closeModal() {
  modal.style.display = "none";
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

fetchPokeList("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
