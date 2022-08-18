const ULR_BASE = "https://pokeapi.co/api/v2/pokemon/";

const foto = document.querySelector("#foto");
const h1 = document.querySelector("#name-pokemon");
const order = document.querySelector(".order");
const btnSelect = document.querySelector(".btn");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

let nextPokemon = 1;

btnNext.addEventListener("click", () => {
  nextPokemon += 1;
  renderPokemon(nextPokemon);
});

const path = document.querySelector("#path");
btnPrev.addEventListener("click", () => {
  if( nextPokemon > 1 ) {
    nextPokemon -= 1;
    renderPokemon(nextPokemon);
  } else {
    path.classList.add("disabled");
  }
});

const getPokemon = async () => {
  const response = await fetch(`${ULR_BASE}${nextPokemon}`);
  if( response.ok ) {
    const json = await response.json();
    return json;
  }
};

const renderPokemon = async () => {
  h1.innerHTML = "carregando..."

  const data = await getPokemon();
  const img = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
    if (data) {
      foto.src = img;
      h1.innerHTML = data.name;
      order.innerHTML = data.order;
    } else {
      foto.src =
        data.sprites.versions["generation-v"][
          "black-white"
        ].animated.front_default;
    }
}

renderPokemon(nextPokemon);
