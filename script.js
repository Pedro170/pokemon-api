const ULR_BASE = "https://pokeapi.co/api/v2/pokemon/";

const foto = document.querySelector("#foto");
const h1 = document.querySelector('#name-pokemon');
const order = document.querySelector('.order');
const btnSelect = document.querySelector('.btn');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

//let pokemon = 1;

// btnNext.addEventListener('click', () => {

// })

// btnPrev.addEventListener('click', () => {

// })

const getPokemon = async () => {
  const random = 1 + Math.floor(Math.random() * 50 - 1);
  const response = await fetch(`${ULR_BASE}${random}`);
  const json = await response.json();

  const img = json.sprites.versions["generation-v"]['black-white'].animated.front_default;

  if( json ) {
    foto.src = img
    h1.innerHTML = json.name;
    order.innerHTML = json.order
  } else {
    foto.src = json.sprites.versions["generation-v"]['black-white'].animated.front_default;
  }
};

getPokemon()
