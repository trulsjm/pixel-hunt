const frontPageEl = document.getElementById('frontPage');
const howToPlayEl = document.getElementById('howToPlay');
const newEl = document.getElementById('play');
const loadEl = document.getElementById('load');
const frontInfoEl = document.getElementById('frontInfo');
const areYouSureWrapEl = document.getElementById('areYouSureWrap');
const sureYesEl = document.getElementById('sureYes');
const sureNoEl = document.getElementById('sureNo');
howToPlayEl.addEventListener('click', howToPlay);
loadEl.addEventListener('click', loadGame);
loadEl.addEventListener('mouseover', loadInfo);
loadEl.addEventListener('mouseout', function () {frontInfoEl.style.marginLeft = '400px'});
newEl.addEventListener('click', areYouSure);
newEl.addEventListener('mouseover', newInfo);
newEl.addEventListener('mouseout', function () {frontInfoEl.style.marginLeft = '400px'});
sureYesEl.addEventListener('click', newGame);
sureNoEl.addEventListener('click', abort)


function loadInfo() {
  frontInfoEl.style.marginLeft = '-5px';
  frontInfoEl.innerHTML = 'Load the game that is already saved on this computer!'
}
function newInfo() {
  frontInfoEl.style.marginLeft = '-5px';
  frontInfoEl.innerHTML = 'Start a new game from scratch! Remember, this will delete your saved game.'
}
function areYouSure() {
  newEl.removeEventListener('mouseover', newInfo);
  frontInfoEl.style.marginLeft = '400px';
  areYouSureWrapEl.style.display = 'grid';
}
function abort() {
  areYouSureWrapEl.style.display = 'none';
  newEl.addEventListener('mouseover', newInfo);
}

function newGame() {

  localStorage.setItem('pokemons', '');
  localStorage.setItem('items', '');
  localStorage.setItem('money', '');

  money = 1000;
  pokedex = [];
  inventory = [];

  start()
}

function loadGame() {
  let localDex = localStorage.getItem('pokemons');
  let currentSearch = ''
  for (var i = 0; i < localDex.length; i++) {  // finds what pokemons the player had
    if (localDex[i] == ' ') {

      for (var a = 0; a < pokemons.length; a++) {
        if (pokemons[a].name == currentSearch) {
          pokedex.push(pokemons[a])
          currentSearch = '';
        }
      }
    }else {
      currentSearch += localDex[i];
    }
  }

  if (localStorage.getItem('money') == '') {
    money = 100;
  }else {
    money = parseInt(localStorage.getItem('money')); // Finds how much money the player had
  }


  let localInventory = localStorage.getItem('items');
  let check = 1;                                        // If check is 1 it's a word, if it's -1 it's a number
  for (var i = 0; i < localInventory.length; i++) {
    if (localInventory[i] == ' ') {
      if (check>0) {
      for (var a = 0; a < items.length; a++) {    // Puts the item in inventory
          if (items[a].name == currentSearch) {
            inventory.push([items[a],0]);
            console.log(items[a]);
            currentSearch = '';
            check = -check;
        }
      }
    }else {
        inventory[inventory.length-1][1]=parseInt(currentSearch);  // Puts the amount of the item in the inventory
        check = -check;
        currentSearch = '';
      }
    }else {
      currentSearch += localInventory[i];
    }
  }
  console.log(currentSearch);
  console.log(check);

  start()
}

function start() {

  frontPageEl.style.opacity = 0;
  setTimeout(function () {
    frontPage.style.display = 'none';
    canvas.style.display = 'block';
    canvas.style.opacity = 1;
    inTransition = false;
  },1000)
}

// switches to the how-to-play page
function howToPlay() {
  frontPageEl.style.marginLeft = '100%';
  document.getElementById('howToPlayPage').style.left = '0%';
}
document.getElementById('howToBack').addEventListener('click', backToFront)
function backToFront() {
  frontPageEl.style.marginLeft = '0%';
  document.getElementById('howToPlayPage').style.left = '-100%';
}
