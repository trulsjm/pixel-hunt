const menuEl = document.getElementById('menu');
const bagHeadlineEl = document.getElementById('bagHeadline');
const bigBagEl = document.getElementById('bigBag');
const bagPocketEl = document.getElementById('bagPocket');
const bagMenuEl = document.getElementById('bagMenu');
const pokedexEl = document.getElementById('pokedex');
const exitBigBagEl = document.getElementById('exitBigBag');
const exitMenuEl = document.getElementById('exitMenu');
const saveEl = document.getElementById('saveGame');

pokedexEl.addEventListener('click', openBigBag);
bagMenuEl.addEventListener('click', openBigBag);
exitBigBagEl.addEventListener('click', function () {bigBagEl.style.left = '-70%'; inTransition = false;});
exitMenuEl.addEventListener('click', function () {menuEl.style.left = '100%'; inTransition = false;})
saveEl.addEventListener('click', save)

function openMenu() {
  inTransition = true;
  menuEl.style.left = '70%'
  console.log('menu opened');
}
function openBigBag(e) {
  bagPocketEl.innerHTML = '';
  menuEl.style.left = '100%';
  if (e.target.id == 'bagMenu') {
    bagHeadlineEl.innerHTML = 'Bag';
    bagPocketEl.innerHTML = '<div class="moneyBag center">'+'Money: '+money+'$'+'</div>';
    for (var i = 0; i < inventory.length; i++) {  // creates the divs dedicated to the items to be shown
      bagPocketEl.innerHTML += '<div id='+inventory[i][0].name+'bigBag class="center pocketElement">'+inventory[i][0].name +'...' + inventory[i][1]+'</div>';
    }
    for (var i = 0; i < inventory.length; i++) { // Adds fitting color for the item

      if (inventory[i][0].type == 'ball') {
        document.getElementById(inventory[i][0].name+'bigBag').style.backgroundColor = 'red';
      }else if (inventory[i][0].type == 'item'){
        document.getElementById(inventory[i][0].name+'bigBag').style.backgroundColor = 'grey';
      }

    }
  } else if (e.target.id == 'pokedex') {
    bagHeadlineEl.innerHTML = 'Pokedex';
    for (var i = 0; i < pokedex.length; i++) {  // creates the divs dedicated to the items to be shown
      bagPocketEl.innerHTML += '<div id='+pokedex[i].name+'bigBag class="pocketPokedex">'+'<img src='+pokedex[i].image+' alt="">'+pokedex[i].name+'</div>';
    }
  }
  bigBagEl.style.left = '-5px';
}
