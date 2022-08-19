const ULR_BASE = "https://pokeapi.co/api/v2/pokemon/";

const foto = document.querySelector("#foto");
const h1 = document.querySelector("#name-pokemon");
const order = document.querySelector(".order");
const btnSelect = document.querySelector(".btn");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const namePowers = document.querySelectorAll(".name-power");
const progressBar = document.querySelectorAll(".progress-bar");

const arrayProgressBar = Array.from(progressBar);
const progress = arrayProgressBar.map((item) => item);
const arraynamePowers = Array.from(namePowers);
const nomePoderes = arraynamePowers.map((item) => item);

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

  const slotFilter = data.types.map((item) => item);
  const powerFilter = data.stats.filter((power, idx) => idx > 0 && idx <= 3);
  const namePower = powerFilter.map((item) => item);

  const img =
    data.sprites.versions["generation-v"]["black-white"].animated.front_default;

  if (data) {
    foto.src = img;
    h1.innerHTML = data.name;
    order.innerHTML = data.order;
    btnSelect.innerHTML = slotFilter[0].type.name;

    progress[0].style.width = powerFilter[0].base_stat > 100 ? "100%" : `${powerFilter[0].base_stat}%`;
    progress[1].style.width = powerFilter[1].base_stat > 100 ? "100%" : `${powerFilter[1].base_stat}%`;
    progress[2].style.width = powerFilter[2].base_stat > 100 ? "100%" : `${powerFilter[2].base_stat}%`;
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
