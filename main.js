"use strict";

let pokemonAmount = 125;
let names = [];
let currentPokemon = [];
let loadedPokemons= [];

// let ThePokemonName = currentPokemon['name'];
// let ThePokemonNumber = currentPokemon['id'];
// let ThePokemonType = currentPokemon['types'][0]['type']['name'];
// let ThePokemonImage = currentPokemon['sprites']['other']['home']['front_default'];
// location_area_encounters: "https://pokeapi.co/api/v2/pokemon/6/encounters"

class Pokemon {
     moves = [];
     moveNames = [];
     moveURL = [];
     moveTypes= [];
    constructor(pokemonInfoAsJson){
        this.name=pokemonInfoAsJson['name'];
        this.id=pokemonInfoAsJson['id'];
        this.type=pokemonInfoAsJson['types'][0]['type']['name'];
        this.image=pokemonInfoAsJson['sprites']['other']['home']['front_default'];
        this.json=pokemonInfoAsJson;    
        this.getMoves(); 
         this.getMoveType();
             
    }


   getMoves (){
        let moves = [];
        let moveNames = [];
        let moveURL = [];
        this.json['moves'].forEach(move =>{
            moves.push(move);
        })

        for (let i = 0; i < moves.length; i++){
            moveNames.push(moves[i]['move']['name']);
            moveURL.push(moves[i]['move']['url']);
        }
       
       this.moves= moves;
       this.moveNames= moveNames;
       this.moveURL= moveURL;  
    }

    async getMoveType() {
        for (let i = 0; i < this.moveURL.length/4; i++)
        {
        let url = this.moveURL[i];
        let response = await fetch(url);
        let responseAsJson = await response.json();
        this.moveTypes.push(responseAsJson['type']['name'])
        }
      
        console.log(this.moveTypes)
       // console.log(responseAsJson['type']['name']);
    }

    
    
}


async function loadPokemon() {
    for (let i = 1; i < pokemonAmount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let pokemonAsJson = await response.json();

        currentPokemon.push(pokemonAsJson);
       // console.log(pokemonAsJson);
        let myPokemon=new Pokemon(pokemonAsJson);
       // console.log("generated new Pokemon", myPokemon,"with json",myPokemon.json,"and with moves",myPokemon.moves,"and with moveURL",myPokemon.moveURL,"and moveTyps",myPokemon.moveTypes);
        loadedPokemons.push(myPokemon);
       // console.log(loadedPokemons);
       // renderPokedex(pokemonAsJson);
        renderPokemon(myPokemon);
    }
    document.getElementById('loadScreen').classList.add('d-none');
    loadBody();
}

function loadBody() {
    document.body.style = 'overflow: unset';
}


function filterPokemons() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    console.log(search);
   
    let filteredPokemons = loadedPokemons.filter(pokemon => pokemon.name.startsWith(search)); //filtert bei dem array currentPokemon alle Pokemons an der stelle name und beinhaltet search welche alle eingegebenen Buchstaben in kleinbuchstaben umwandelt
    let content = document.getElementById('pokeMain');
    content.innerHTML = '';
    for (let i = 0; i < filteredPokemons.length; i++) {
        renderPokemon(filteredPokemons[i]);
    }
}

function openPokeStats(pokemonId) {
    let pokemon = currentPokemon.find(p => p.id === pokemonId);
    let statsType = pokemon['types'][0]['type']['name'];
    let content = document.getElementById('pokeStats');
    let mainDex = document.getElementById('pokeMain');

    mainDex.classList.add('d-none');
    content.classList.remove('d-none');
    content.innerHTML = '';

    content.innerHTML =  pokeDetailsTemplate(pokemonId);
            
    document.getElementById(`pokeStatsChild`).style.backgroundColor = terminateColor(statsType); //
    renderAbilities(pokemon);
}





function renderAbilities(pokemon) {
    for (let i = 0; i < pokemon['abilities'].length; i++) {
        let ability = pokemon['abilities'][i]['ability']['name'];
        document.getElementById('abilities' + pokemon.id).innerHTML += `<span class="abilityClass">${ability}</span>`;

    }
}





function goBack() {
    document.getElementById('pokeStats').classList.add('d-none');
    document.getElementById('pokeMain').classList.remove('d-none');
}







 function terminateColor(type) {
 switch (type) {
    case 'poison': return '#a890f0';
     case 'fire': return '#F7786B';
     case 'water': return '#58ABF6';
     case 'grass': return '#94C9AD';
     case 'normal': return '#a8a878' ;
     case 'fighting': return '#c03028'  ;
     case 'flying': return '#a890f0' ;
     case 'rock': return '#b8a038' ;
     case 'electric': return '#f8d030' ;
     case 'psychic': return '#f85888' ;
     case 'ice': return '#98d8d8' ;
     case 'fairy': return '#ee99ac' ;
     case 'dark': return '#705848' ;
     case 'ghost': return '#705898' ;
     case 'bug': return '#a8b820' ;
     case 'dragon': return '#7038f8' ;
     case 'ground': return '#e0c068' ;
 }
}


function renderPokemon(pokemon) {
    names.push(pokemon.name);

    let content = document.getElementById('pokeMain');

    content.innerHTML += `
    <div onclick="openPokeStats(${pokemon.id})" class="pokeCard" id="pokeCard${pokemon.id}">
        <h2>${pokemon.name.toUpperCase()}</h2> 
        <span># <b>${pokemon.id}</b></span> 
        <span class="theType">${pokemon.type}</span> 
        <img class="pokeImg" src="${pokemon.image}">
    </div>
    `;

    document.getElementById(`pokeCard${pokemon.id}`).style.backgroundColor = terminateColor(pokemon.type); //
}





   
