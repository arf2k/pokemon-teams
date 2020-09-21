const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers/`
const POKEMONS_URL = `${BASE_URL}/pokemons/`



document.addEventListener('DOMContentLoaded', e => {
     console.log("loaded")
     getTrainers();
     clickHandler();
    
})

function getTrainers() {
     const main = document.querySelector("main")
     fetch(TRAINERS_URL)
          .then(resp => resp.json())
          .then(trainers => {
               main.innerHTML=""
               for (trainer of trainers) {
                    main.append(renderTrainer(trainer))
               }
          })
}

function renderTrainer(trainer) {
     // < div class="card" data - id="1">
     let trainerCard = document.createElement("div")
     trainerCard.dataset.id = trainer.id
     trainerCard.innerHTML = `<p>${trainer.name}</p>
     <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button>`

     let pokemons = renderPokemons(trainer.pokemons)
     trainerCard.append(pokemons)
     return trainerCard

}

function renderPokemons(pokemons) {
     let pokemonUl = document.createElement('ul')
     for (let pokemon of pokemons) {
          let pokemonLi = document.createElement('li')
          pokemonLi.innerHTML = `
               <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
               `
          const rename = document.createElement("p")
          rename.innerHTML = `<input type="text" value=${pokemon.nickname}>
          <button class="change" style="height: 14px; lineheight: 10px; margin: 1px;" data-pokemon-id=${pokemon.id}>C</button>`
          pokemonLi.append(rename)
          pokemonUl.append(pokemonLi)
     }
     return pokemonUl
}


function clickHandler(){
     document.addEventListener('click', e =>{
          if (e.target.matches('.add')){
               const trainerId = (e.target.dataset.trainerId)
               addPokemon(trainerId)
               // addPokemon(e.target.dataset.trainerId)
          }else if(e.target.matches(".release")) {
               const pokemonId = (e.target.dataset.pokemonId)
               releasePokemon(pokemonId)
          }else if(e.target.matches(".change")){
               const pokemonId = (e.target.dataset.pokemonId)
               console.log(pokemonId)
               const newName = (e.target.parentElement.firstChild.value)
               updatePokemon(pokemonId, newName)
          }
     })
}

function updatePokemon(pokemonId, newName){
     const options ={
          method: "PATCH",
          headers: {"content-type": 'application/json', 
     "accept": "application/json"},
          body: JSON.stringify(nickname: newName)
     }
     console.log(options)
     fetch(POKEMONS_URL + pokemonId,  options)
     .then(resp => resp.json())
     .then(pokemon=> {
          console.log(pokemon)
          getTrainers()})
     .catch(errors => alert(errors))
     // .then(resp => resp.json())
     // .then(pokemon => {
     //      getTrainers();
     

}



function addPokemon(trainerId){
     const options = {
          method: "POST",
          headers: {"content-type": 'application/json'},
          body: JSON.stringify({"trainer_id": trainerId})
     }
     fetch(POKEMONS_URL, options)
     .then(resp => resp.json())
     .then(pokemon => {
          console.log(pokemon)
          getTrainers();
     })
     
}

function releasePokemon(pokemonId){
     const options = {
          method: "DELETE",
     }
     fetch(POKEMONS_URL + pokemonId, options)
     .then(resp => resp.json())
     .then(pokemon => {
          console.log(pokemon)
          getTrainers();
     })
     

}