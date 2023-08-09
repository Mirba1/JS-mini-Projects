const pokedex = document.getElementById('pokedex');
const search = document.getElementById('search')
const sort = document.getElementById('sort')
const cachedPokemon = {};
let allpokemons = []


const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data= await res.json();
    allpokemons = data.results.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
            1}.png`
    }));

    displayPokemon(allpokemons);
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) =>
                `
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        </a>
    </li>
        `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!cachedPokemon[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        cachedPokemon[id] = pokeman;
        displayPokemanPopup(pokeman);
    } else {
        displayPokemanPopup(cachedPokemon[id]);
    }
};

const displayPokemanPopup = (pokeman) => {
    const type = pokeman.types.map((type) => type.type.name).join(', ');
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Close</button>
            <div class="card">
                <img class="card-image" src="${
                    pokeman.sprites['front_default']
                }"/>
                <h2 class="card-title">${pokeman.name}</h2>
                <p><small>Type: ${type} | Height:</small> ${pokeman.height} | Weight: ${
        pokeman.weight
    }</p>
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};


// search.addEventListener('keyup', (e) => {
//     const searchString = e.target.value.toLowerCase();

//     const filteredPokemons = allpokemons.filter((pokemon) => {
//         return pokemon.name.toLowerCase().includes(searchString)
//     });
//     displayPokemon(filteredPokemons);
// });
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

const debouncedDisplay = debounce((e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredPokemons = allpokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchString)
    });

    displayPokemon(filteredPokemons);
}, 1000);

search.addEventListener('keyup', debouncedDisplay);


let check = false;  

sort.addEventListener('click', () => {
    if (check) {
        allpokemons.sort((a, b) => b.id - a.id);
    } else {
        allpokemons.sort((a, b) => a.id - b.id);
    }
    
    check = !check;

    displayPokemon(allpokemons);
});



fetchPokemon();