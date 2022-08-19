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
  path.classList.remove("disabled");
  renderPokemon(nextPokemon);
});

const path = document.querySelector("#path");
btnPrev.addEventListener("click", () => {
  if (nextPokemon > 1) {
    nextPokemon -= 1;
    renderPokemon(nextPokemon);
  } else {
    path.classList.add("disabled");
  }
});

const getPokemon = async () => {
  const response = await fetch(`${ULR_BASE}${nextPokemon}`);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
};

const renderPokemon = async () => {
  h1.innerHTML = "carregando...";

  const data = await getPokemon();
  console.log(data)
  const img =
    data.sprites.versions["generation-v"]["black-white"].animated.front_default;
  if (data) {
    foto.src = img;
    h1.innerHTML = data.name;
    order.innerHTML = data.order;
    // btnSelect.innerHTML = data.types.map( type => type.name);
  } else {
    foto.src =
      data.sprites.versions["generation-v"][
        "black-white"
      ].animated.front_default;
  }
};

// const handleOpenModal = () => {
//   const close = document.querySelector(".close");
//   const modal = document.querySelector("#container-modal");
//   close.addEventListener('click', () => {
//     modal.classList.remove('open')
//   })
//   modal.classList.add('open');


// };
// btnSelect.addEventListener("click", handleOpenModal);

renderPokemon(nextPokemon);
