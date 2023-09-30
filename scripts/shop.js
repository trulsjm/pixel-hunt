const shopEl = document.getElementById('shop');
const exitEl = document.getElementById('exit');
const moneyEl = document.getElementById('money');
const productEl = document.getElementById('product');
const productInfoEl = document.getElementById('productInfo');
const howManyEl = document.getElementById('howMany');

const backEl = document.getElementById('back');
const priceWrapEl = document.getElementById('priceWrap');
const inBagEl = document.getElementById('inBag');
const countWrapEl = document.getElementById('countWrap');
  const upEl = document.getElementById('up');
  const downEl = document.getElementById('down');
  const amountEl = document.getElementById('amount');
  const sumEl = document.getElementById('sum');
const buyEl = document.getElementById('buy');

exitEl.addEventListener('click', exitShop)
backEl.addEventListener('click', function () {
  howManyEl.style.display = 'none';
  productEl.style.display = 'grid';
});
upEl.addEventListener('click', amountChange);
downEl.addEventListener('click', amountChange);
buyEl.addEventListener('click', buy);

const shopMenu = [
  [items[0], 10],
  [items[1], 20],
  [items[2], 30],
  [items[3], 10],
  [items[4], 10],
  [items[5], 10],
]

function shop() {
  console.log('currently shopping');
  canvas.style.opacity = 0;
  setTimeout(function() {
    canvas.style.display = 'none';
    shopEl.style.display = 'grid';
    moneyEl.innerHTML = 'Money: <br><br>'+money+' $';

    productEl.innerHTML = '';

    for (var i = 0; i < shopMenu.length; i++) {
      productEl.innerHTML += '<div id='+shopMenu[i][0].name+'product class="center">'+shopMenu[i][0].name +' ......' + shopMenu[i][1]+' $</div>';
    }
    for (var i = 0; i < shopMenu.length; i++) {
      document.getElementById(shopMenu[i][0].name+'product').addEventListener('click', howMany);
      document.getElementById(shopMenu[i][0].name+'product').addEventListener('mouseover', function (e) {
        for (var i = 0; i < shopMenu.length; i++) {  // Decides which product was clicked
          if (shopMenu[i][0].name+'product'===e.target.id) {
            productInfoEl.innerHTML = shopMenu[i][0].info;
          }
        }
      });
    }

    setTimeout(function() {
      shopEl.style.opacity = 1;
    },10) // have to wait a few milliseconds for transition to activate
  },1000)
  return
}

let amount = 1;
let sum;
let chosen;
function howMany(e) {
  productEl.style.display = 'none';
  howManyEl.style.display = 'grid';
  let inBag = 0;
  for (var i = 0; i < shopMenu.length; i++) {  // Decides which product was clicked
    if (shopMenu[i][0].name+'product'===e.target.id) {
      chosen = shopMenu[i];
    }
  }
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i][0].name+'product'===e.target.id) { // checks how many of the product is in bag
      inBag += inventory[i][1];
    }
  }
  inBagEl.innerHTML = 'in bag: <br>'+ inBag;
  productInfoEl.innerHTML = chosen[0].info;
  priceWrapEl.innerHTML = chosen[0].name+'<br><br>'+chosen[1]+'$';
  amount = 1;
  amountEl.innerHTML = amount;
  sumEl.innerHTML = amount*chosen[1]+'$'
}

function amountChange(e) {
  console.log(e.target.id);
  amount += (e.target.id == 'up');
  amount -= (e.target.id == 'down');
  amount += (amount<1);
  amountEl.innerHTML = amount;
  sumEl.innerHTML = amount*chosen[1]+'$';
}
function buy() {
  if (money<amount*chosen[1]) {return}; // so you cant buy if you cant afford
  let inInventory = false;
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i][0].name == chosen[0].name) {
      inventory[i][1]+= amount;
      inInventory = true;
    }
  }
  if (!inInventory) {
    console.log('nei');
    inventory.push([chosen[0], amount])
  }
  money -= amount*chosen[1];
  moneyEl.innerHTML = 'Money: <br>'+money;
  howManyEl.style.display = 'none';
  productEl.style.display = 'block';
}

function exitShop() {
  shopEl.style.opacity = 0;
  setTimeout(function () {
    howManyEl.style.display = 'none';
    productEl.style.display = 'block';
    productInfoEl.innerHTML = '';
    shopEl.style.display = 'none';
    canvas.style.display = 'block';
    canvas.style.opacity = 1;
    inTalk = false;
  },1000)
}
