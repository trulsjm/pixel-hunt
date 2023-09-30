const canvas = document.getElementById("canvas");
const fightEl = document.getElementById("fight");
const ctx = canvas.getContext("2d");

const whatEl = document.getElementById('what');
const letItGoEl = document.getElementById('go');
letItGoEl.addEventListener('click', endFight);
const ballsEl = document.getElementById('balls');
ballsEl.addEventListener('click', openBalls);
const bagEl = document.getElementById('bag');
bagEl.addEventListener('click', openBag);
const lastUsedEl = document.getElementById('lastUsed');
lastUsedEl.addEventListener('click', lastUsedFunction);

const itemsWrapEl = document.getElementById('itemsWrap');
const itemsEl = document.getElementById('items');
const pokemonEl = document.querySelector('.pokemon');
const thrownBallEl = document.querySelector('.thrownBall');
const thrownItemEl = document.querySelector('.thrownItem');
const talkEl = document.getElementById('talk');

let keyState = {};
const keydown = function(e){
  keyState[e.keyCode || e.which] = true;
}
const keyup = function(e){
  keyState[e.keyCode || e.which] = false;
}
window.addEventListener('keydown', keydown, true)
window.addEventListener('keyup', keyup, true)
window.onkeydown = function(inputKey) {
             var key = inputKey.keyCode ? inputKey.keyCode : inputKey.which;

             if (key == 32 && !inFight) {  // x key
                 talk();
             }
             if (key == 77 && !inFight && !inTalk && !inTransition) {
               openMenu();
             }
             if (key == 83) {
               save();
             }
}

class itemClass {
  constructor(_type, _name, _effect, _info, _comment) {  //
    this.type = _type;
    this.name = _name;
    this.effect = _effect;
    this.info = _info;
    this.comment = _comment;
  }
}
let activeItem = false;
class pokemon {
  constructor(_name, _image, _catchrate, _fleeRate) {
    this.name = _name;
    this.image = _image;
    this.catchrate = _catchrate; // Percentage
    this.fleeRate = _fleeRate;   // Percentage
  }
}
let pokemons = [
  new pokemon('Sus', 'bilder/sus.png', 1, 10),
  new pokemon('Juan', 'bilder/juan.png', 8, 30),
  new pokemon('Big-Chungus', 'bilder/big-chungus.png', 4, 30),
  new pokemon('Butter-Dog', 'bilder/butterdog.png', 13, 30),
  new pokemon('Siren-Head', 'bilder/siren-head.png', 15, 30),
  new pokemon('Rodrick', 'bilder/rodrick.png', 20, 30),
  new pokemon('Herobrine', 'bilder/herobrine.png', 0.5, 40),
];
let currentPokemon = null; // The pokemon currently in action
let pokemonCatchState = 1; // is the catchrate of the pokemon affected?
let pokemonFleeState = 1; //  is the odds of the pokemon fleeing affected?

// items
let items = [
new itemClass('ball','CommonBall', 1, 'works kinda good'),
new itemClass('ball','MegaBall', 1.5, 'works fine'),
new itemClass('ball','UltraBall', 2, 'works averagely'),
      // effect on items is [catchrate boost, fleerate boost]
new itemClass('item','Rock', [1.5, 1.5], 'Rock to throw lol', ' became woozy and frightened!'),
new itemClass('item','Odor', [1, 0.9], 'Lets off a nice smell, that makes the prey want to stay', ' Was delighted!'),
new itemClass('item','Puzzle', [1, 0.83], 'A confusing puzzle to distract the prey', ' Was confused!'),

]

// Player variables
let player = {
  x: 7,
  y: 6,
  size: tileSize*0.8,
}
let trainer_img = new Image();
trainer_img.src = 'bilder/trainer.png';  // image of trainer
let facing = [0,1]; // which way the player is facing [x,y]
let inFight = false;
let inTalk = false;
let inTransition = true;
const walkspeed = 5;

let inventory = [];
let money = 0;       // These 3 are defined out from new or load game
let pokedex = [];

let lastUsed;

// Map variables:
const frameSize = 64;
let frameRow = 0;

let map = mapArray[3];
let currentTile = [-3, -3]; // [x, y]
let nextTile = null;
let mapObject = { // where the map is to be printed from. To be connected with currentTile and spawn in map.js
  x: tileSize*currentTile[0],
  y: tileSize*currentTile[1],
}
let movement = 0;
let xspeed = 0;
let yspeed = 0;

function print() {
  if (inFight) {
    return
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (movement>0) {
              // Hitbox

    if (map[player.y-1+nextTile[1]][player.x-1+nextTile[0]].type === 'door' ||
        map[player.y-1+nextTile[1]][player.x-1+nextTile[0]].type === 'entrance') {  // Checs if next tile is a door or entrance
      door();
    }

    if (!map[player.y-1+nextTile[1]][player.x-1+nextTile[0]].passable) { // Checks if next tile is passable
      xspeed = 0;
      yspeed = 0;
      movement = 0;
    }
    mapObject.x -= xspeed; // makes the map move
    mapObject.y -= yspeed;
    movement += Math.abs(yspeed) + Math.abs(xspeed) // movement tracks where between tiles player is
    if (movement > tileSize) { // changes values of tiles when player has reached a new tile
      movement = 0;
      currentTile = nextTile;
      mapObject.x = currentTile[0]*tileSize;
      mapObject.y = currentTile[1]*tileSize;
      if (map[player.y-1+currentTile[1]][player.x-1+currentTile[0]].type==='highGrass' && Math.random()*6<1) {  // checks if player is in highgrass, and there's 1/6 chance of meeting a pokemon
        inFight = true;
        keyState = {};
        fight()    // commense capturing sequence
      }
    }
  }
  // prints

  for (let i = 0; i < map.length; i++) {        // Goes through every array slot (tile), of every row in the current map
    for (let a = 0; a < map[i].length; a++) {
      ctx.beginPath()
      let tile = map[i][a];
      let crds = tile.coordinates;  // Takes coordinates of the tiles print from the main tileset
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tileMapImg,crds[0],crds[1],crds[2],crds[3],-mapObject.x+a*tileSize,-mapObject.y+i*tileSize,tileSize,tileSize);
    }
  }
  for (let i = 0; i < map.length; i++) {
    for (let a = 0; a < map[i].length; a++) {
      let tile = map[i][a];
      let tileArray = Object.keys(tile);
        if (tile.type==='image' && i+1<=player.y+currentTile[1]|| tile.type==='highGrass'|| tile.type === 'flatImage') {
          ctx.beginPath()
          let bruh = tile.source;
          let crds = tile.coordinates;
          let img = tile.frontImg;
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(bruh,img[0],img[1],img[2],img[3],-mapObject.x+a*tileSize+img[6],-mapObject.y+i*tileSize+img[7],img[4],img[5]);
      }else  if (tile.type == 'outrance') {
        let bruh = tile.add;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(bruh,0,0,78,33,-mapObject.x+a*tileSize,-mapObject.y+i*tileSize+tileSize/2,tileSize,tileSize/2);
      }else if (tile.type == 'door') {
        let bruh = tile.source;
        let crds = tile.coordinates;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(bruh,crds[0],crds[1],crds[2],crds[3],-mapObject.x+a*tileSize,-mapObject.y+i*tileSize,tileSize,tileSize);
        bruh = tile.frontImg;
        ctx.drawImage(bruh[0],bruh[1][0],bruh[1][1],bruh[1][2],bruh[1][3],-mapObject.x+a*tileSize+bruh[2][0],-mapObject.y+i*tileSize+bruh[2][1],bruh[2][2],bruh[2][3]);
      }
    }
  }

  // prints player
    let movementCheck = Math.floor(movement/(0.25*tileSize));  //checks where between tiles player is, and chooses image x accordingly
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(trainer_img,movementCheck*frameSize,frameRow*frameSize,frameSize,frameSize,(player.x-1)*tileSize*0.98,(player.y-1)*tileSize*0.89,1.4*tileSize,1.4*tileSize)

      //Checks if player is behind the "root" of the image. The image should then be printed again, so that player walks behind the image
      for (let i = 0; i < map.length; i++) {
        for (let a = 0; a < map[i].length; a++) {
          let tile = map[i][a];
          let tileArray = Object.keys(tile);
            if (tile.type==='image' && i+1>player.y+currentTile[1] || tile.type==='flatImage' && i>player.y+currentTile[1] || tile.type==='highGrass' && i+1>=player.y+currentTile[1]) {

              if (!(facing[0]==0 && facing[1]==1 && movement>0  && i+1==player.y+currentTile[1])) {   // Makes for correct printing when walking downwards in highgrass

              ctx.beginPath()
              let bruh = tile.source;
              let crds = tile.coordinates;
              let img = tile.frontImg;
              ctx.imageSmoothingEnabled = false;
              ctx.drawImage(bruh,img[0],img[1],img[2],img[3],-mapObject.x+a*tileSize+img[6],-mapObject.y+i*tileSize+img[7],img[4],img[5]);
            }
          }
        }
      }

  // movement
  if (!inTransition && !inTalk) {  //so you can't move during a transition or talk
    if (keyState[37] && movement === 0){ //left
      facing = [-1,0];
      nextTile = [currentTile[0]-1,currentTile[1]]
      frameRow = 1;
      if (map[0].length-mapObject.x/tileSize==map[0].length+6) {
        if (map[player.y-1+currentTile[1]][player.x-1+currentTile[0]].type==='outrance') {
          door()
        }
        return
      }
      movement = 1;
      xspeed = walkspeed;
      yspeed = 0;
    }
    if (keyState[38] && movement === 0){ //up
      facing = [0,-1];
      nextTile = [currentTile[0],currentTile[1]-1]
      frameRow = 3;
      if (map.length-mapObject.y/tileSize==map.length+5) {
        if (map[player.y-1+currentTile[1]][player.x-1+currentTile[0]].type==='outrance') {
          door()
        }
        return
      }
      movement = 1;
      yspeed = walkspeed;
      xspeed = 0;
    }
    if (keyState[39] && movement === 0){ //right
      facing = [1,0];
      nextTile = [currentTile[0]+1,currentTile[1]]
      frameRow = 2;
      if (map[0].length-mapObject.x/tileSize==7) {
        if (map[player.y-1+currentTile[1]][player.x-1+currentTile[0]].type==='outrance') {
          door()
        }
        return
      }
      movement = 1;
      xspeed = -walkspeed;
      yspeed = 0;
    }
    if (keyState[40] && movement === 0){ //down
      facing = [0,1];
      nextTile = [currentTile[0],currentTile[1]+1]
      frameRow = 0;
      if (map.length-mapObject.y/tileSize==6) {
        if (map[player.y-1+currentTile[1]][player.x-1+currentTile[0]].type==='outrance') {
          door();
        }
        return
      }
      movement = 1;
      yspeed = -walkspeed;
      xspeed = 0;
    }
  }

}let interval = setInterval(print,1000/30);


function fight() {
  canvas.style.animation = 'blinking 2s';
  //interval2 = setInterval(timeDelay,1000);
  setTimeout(function (){
    canvas.style.display = 'none';

    // Chooses random pokemon
    let random = Math.floor(Math.random()*pokemons.length);
    currentPokemon = pokemons[random];
    document.getElementById('name').innerHTML = pokemons[random].name
    document.getElementById('pokemon').innerHTML = '<img src="'+pokemons[random].image+'" alt="">'

    fightEl.style.display = "flex";
    fightEl.style.animation = "swipe 2s";
    whatEl.innerHTML = 'A wild '+currentPokemon.name+' appeared!<br> What will you do?';

  }, 2000)
}

function endFight() {
  if (activeItem) {
    return;
  }
  pokemonCatchState = 1;
  pokemonFleeState = 1;

  fightEl.style.animation = 'fadeOut 2.1s';
  fightEl.style.animationFillMode = 'forwards'
  //interval2 = setInterval(timeDelay2,1000);
  setTimeout(function(){
    canvas.style.display = 'block';
    canvas.style.animation = 'blink 1s';
    fightEl.style.display = "none";
    fightEl.style.animation = 'none';
    itemsWrapEl.style.top = '600px';
    thrownBallEl.style.display = 'none';
    thrownBallEl.style.backgroundColor = 'red';
    pokemonEl.style.opacity = 1;
    document.querySelector('.options').addEventListener('click', openBalls);

    inFight = false;
  }, 2000)
}
function openBalls() {
  if (activeItem) {return;}

  console.log('balls opened');
  itemsWrapEl.style.top = '176px';
  document.getElementById('itemsHeadline').innerHTML = 'Balls';
  let itemsEl = document.getElementById('items');
  itemsEl.innerHTML = '';

  // create array with balls
  let ballArray = []
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i][0].type == 'ball') {
      ballArray.push(inventory[i]);
    }
  }

  for (var i = 0; i < ballArray.length; i++) { // creates divs to the balls in inventory to be shown
    itemsEl.innerHTML += '<div id='+ballArray[i][0].name+' class="item click center">'+ballArray[i][0].name +'...' + ballArray[i][1]+'</div>';
  }
  for (var i = 0; i < ballArray.length; i++) { // adds eventlistener click to these divs
    document.getElementById(ballArray[i][0].name).addEventListener('click', intermediary);
  }
}
function throwBall(e) {
  activeItem = true;

  itemsWrapEl.style.top = '600px';
  thrownBallEl.style.display = 'block';
  whatEl.innerHTML = 'You used '+ inUse+'!';

  // fades pokemon out
  setTimeout(function () {
      pokemonEl.style.opacity = 0;
  }, 1200)
  setTimeout(function dissapear(){

    // calculate catch rates
    console.log(currentPokemon.catchrate);
    let odds = currentPokemon.catchrate*ballEffect*pokemonCatchState;
    let random = Math.random()*100;
    console.log('catchrate:'+ currentPokemon.catchrate);
    console.log('balleffect:'+ ballEffect);
    console.log('catch State:'+ pokemonCatchState);
    console.log('odds: '+odds);
    console.log('random: '+random);

      // wobble once
      thrownBallEl.style.left = '640px';
      setTimeout(function(){
        thrownBallEl.style.left = '660px';
        setTimeout(function(){
          thrownBallEl.style.left = '650px';
          if (random<odds+((100-odds)*2)/3) { // wobble twice
            console.log('wobble twice');
          setTimeout(function(){
            thrownBallEl.style.left = '640px';
            setTimeout(function(){
              thrownBallEl.style.left = '660px';
              setTimeout(function(){
                thrownBallEl.style.left = '650px';
                if (random<odds+(100-odds)/3) { // wobble thrice
                  console.log('wobble thrice');
                setTimeout(function(){
                  thrownBallEl.style.left = '640px';
                  setTimeout(function(){
                    thrownBallEl.style.left = '660px';
                    setTimeout(function(){
                      thrownBallEl.style.left = '650px';
                      if (random<odds) {  // it was cought
                      setTimeout(function(){
                        whatEl.innerHTML = currentPokemon.name+' was cought!'
                        thrownBallEl.style.backgroundColor = 'black';
                        activeItem = false
                        setTimeout(function(){
                          endFight()
                        }, 1000)
                        for (var i = 0; i < pokedex.length; i++) {
                          if (currentPokemon == pokedex[i]) {
                            return
                          }
                        }
                        pokedex.push(currentPokemon)

                      },1000)
                    }
                    else {
                      console.log('NAAAAAAAAAAAAAAAAHHHHHHHH');
                      notCaught()
                    }
                    },500)
                  },500)
                },1000)
              }
              else {
                console.log('naaaaah');
                notCaught()
              }
              },500)
            },500)
          },1000)
        }
        else {
          console.log('nah');
          notCaught()
        }
        },500)
      },500)

  },3000);
}

function notCaught() {  // pokemon escapes ball
  setTimeout(function(){
    thrownBallEl.style.display = 'none';
    pokemonEl.style.opacity = 1;
    whatEl.innerHTML = 'It escaped!<br> What will you do?';

    // calculate if pokemon should flee
    if (Math.random()*100<currentPokemon.fleeRate*pokemonFleeState) {
      setTimeout(function () {
        flee();
      },1000)
    }
      activeItem = false;


  }, 1000)
}
function flee() {
  activeItem = true;
  whatEl.innerHTML = 'Oh no! '+currentPokemon.name+' fled!';
  console.log('chanses of fleeing:'+ currentPokemon.fleeRate*pokemonFleeState );
  pokemonEl.style.transform = 'rotate(-40deg)';
  pokemonEl.style.left = '460px';
  pokemonEl.style.top = '120px';
  setTimeout(function () {
    activeItem = false;
    endFight();
    activeItem = true;
    pokemonEl.style.transform = 'rotate(0deg)';
    pokemonEl.style.top = '140px';
    pokemonEl.style.left = '1000px';
    setTimeout(function () {
      pokemonEl.style.left = '510px';
      activeItem = false;
    },2000)
  },1000);
}

function openBag() {
  if (activeItem) {return;}

  console.log('bag opened');
  document.getElementById('itemsHeadline').innerHTML = 'Bag';
  itemsWrapEl.style.top = '176px';
  let itemsEl = document.getElementById('items');
  itemsEl.innerHTML = '';

  for (var i = 0; i < inventory.length; i++) {  // creates the divs dedicated to the items to be shown
    itemsEl.innerHTML += '<div id='+inventory[i][0].name+' class="item click center">'+inventory[i][0].name +'...' + inventory[i][1]+'</div>';
  }
  for (var i = 0; i < inventory.length; i++) {  // adds eventlistener click to the divs shown
    document.getElementById(inventory[i][0].name).addEventListener('click', intermediary);
  }
}
function intermediary(e) {
  useItem(e.target)
}

let item;
let inUse;       // these must be declered outside functions so they can travel to throwBall()
let ballEffect;

function useItem(element) {
  if (activeItem) {return};
  activeItem = true;
  for (var i = 0; i < inventory.length; i++) {  // finds what item was clicked
    if (inventory[i][0].name == element.id) {
      console.log(element);
      item = inventory[i];
      console.log(item);
      inUse =  inventory[i][0].name;
      ballEffect = inventory[i][0].effect;
      // finds what ball was used and takes away one from inventory
      lastUsed = document.getElementById(inventory[i][0].name);
      inventory[i][1] -= 1;
      if (inventory[i][1]===0) {              // if there are 0 left of the item, the item is removed from inventory
        inventory.splice(i,1);
     }
    }
  }
  if (item[0].type == 'ball') {
    throwBall(element);
    return;
  }else if (item[0].type == 'item') {
    pokemonCatchState *= item[0].effect[0];
    pokemonFleeState *= item[0].effect[1];

    whatEl.innerHTML = 'You used '+ item[0].name+'!';
    itemsWrapEl.style.top = '600px';
    thrownItemEl.style.display = 'block';
    setTimeout(function () {
      pokemonEl.style.transform = 'rotate(20deg)';
      setTimeout(function () {
        pokemonEl.style.transform = 'rotate(0deg)';
        thrownItemEl.style.display = 'none';
        // check if pokemon should flee
        setTimeout(function () {

          if (Math.random()*100<currentPokemon.fleeRate*pokemonFleeState) {
              flee();
          }else {
              whatEl.innerHTML = currentPokemon.name+item[0].comment;
              // shivering pokemon animation
              pokemonEl.style.left = '530px';
              setTimeout(function () {
                pokemonEl.style.left = '490px';
                setTimeout(function () {
                  pokemonEl.style.left = '510px';
                  activeItem = false;
                },200)
              },200)
            }
        },1000)

      },200)
    },350)
  }
}

function door() {
  if (inTransition) {return}


  inTransition = true;
  clearInterval(interval);
  canvas.style.opacity = 0;

  setTimeout(function () {
    if (map[player.y-1+currentTile[1]][player.x-1+currentTile[0]].type==='outrance') {
      let square = map[player.y-1+currentTile[1]][player.x-1+currentTile[0]];
      mapObject.x = square.spawn[1][0]*tileSize;
      mapObject.y = square.spawn[1][1]*tileSize;
      nextTile = square.spawn[0];
      map = mapArray[square.spawn[2]];;
      currentTile = square.spawn[0];
    }else if(map[player.y-1+nextTile[1]][player.x-1+nextTile[0]].type === 'entrance' ||
            map[player.y-1+nextTile[1]][player.x-1+nextTile[0]].type === 'door'){
      let square = map[player.y-1+nextTile[1]][player.x-1+nextTile[0]];
      currentTile = square.spawn[0]
      mapObject.x = square.spawn[1][0]*tileSize;
      mapObject.y = square.spawn[1][1]*tileSize;
      nextTile = square.spawn[0]; // sets spawn on new map
      map = mapArray[square.spawn[2]];
    }
    interval = setInterval(print,1000/30);
    setTimeout(function () {
      canvas.style.opacity = 1;
      inTransition = false;
    },100)
  },900)
}

let phraceCount = 0; // keeps track of what phrace should be said when talking to someone
function talk() {
  let facingTile = map[player.y-1+currentTile[1]+facing[1]][player.x-1+currentTile[0]+facing[0]].talkable;
  if (!facingTile[0]) { // checks if the tile is supposed to be talked to
    return;
  }
  inTalk = true;
  if (facingTile[1] === 'shop') {
    shop()
    return;
  }
  phraceCount += 1;
  if (phraceCount>facingTile.length-1) { // ends conversation when target has no more phraces to say
    talkEl.style.display = 'none';
    phraceCount = 0;
    inTalk = false;
    return;
  }
  talkEl.style.display = 'block';
  talkEl.innerHTML = facingTile[phraceCount];
}
function lastUsedFunction() {
  if (!lastUsed) return;
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i][0].name == lastUsed.id) {
      useItem(lastUsed);
    }
  }
}
