

function save() {
  let pokemons = '';
  for (var i = 0; i < pokedex.length; i++) {  // Saves pokedex in a localStorage string
    pokemons += pokedex[i].name+' ';
  }
  localStorage.setItem('pokemons', pokemons);

  localStorage.setItem('money', money); // saves money in localStorage

  let items = '';
  let amount = '';
  for (var i = 0; i < inventory.length; i++) {  // Saves inventory in a localStorage string
    items += inventory[i][0].name+' '+inventory[i][1]+' ';
  }
  localStorage.setItem('items', items);    // string with items and amounts

  console.log('saved');
}
