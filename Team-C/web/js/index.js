let money = 0;
let rollList = [];
let rollMoney = 300;
let moneyUI = null;
let cardCover = null;
let cardEffect = null;
let rollListDOM = null;
let isRollDone = true;
let rand = 0;

window.onload = function() {
  // init
  money = initMoney();
  moneyUI = document.querySelector('.money-ui');
  cardCover = document.querySelector('.card-cover');
  cardEffect = document.querySelector('.card-effect');

  // render Money
  renderMoney(money);

  // build roll list
  buildListDOM();

  let rollBtn = document.querySelector('.roll-btn');
  rollBtn.addEventListener('click', processRollClicking);
  rollListDOM.addEventListener('transitionend', doneRoll);
};

function doneRoll() {
  isRollDone = true;
  rollListDOM.classList.remove('trans');
}

function buildListDOM() {
  // clean roll list
  rollList = [];

  for(let i = 0; i < 20; i++) {
    rand = Math.floor((Math.random() * cardList.length));
    rollList.push(cardList[rand]);
  }

  rollListDOM = document.querySelector('.roll-list');
  // clean roll list dom
  rollListDOM.innerHTML = '';

  for(let i = 0; i < rollList.length; i++) {
    let newItem = document.createElement('li');
    switch(rollList[i].type) {
      case 0: newItem.classList.add('white-card'); break;
      case 1: newItem.classList.add('green-card'); break;
      case 2: newItem.classList.add('blue-card'); break;
      case 3: newItem.classList.add('red-card'); break;
    }
    newImg = document.createElement('img');
    newImg.src = `${rollList[i].src}`;
    newItem.append(newImg);
    rollListDOM.append(newItem);
  }
}

function processRollClicking(event) {
  // check if money is enough
  if(money < rollMoney) {
    // prompt Notice
    alert('沒錢還想玩？')
    return;
  }

  // check if roll is done
  if(!isRollDone) {
    alert('人生急不得');
    return;
  }
  // switch roll done to false
  isRollDone = false;
  // reset roll list
  buildListDOM();
  rollListDOM.classList.remove('rolled');
  cardCover.classList.remove('disable');

  // Consume money
  money -= rollMoney;

  // pass Data to WebView
  let dataStr = JSON.stringify(rollList[rollList.length - 1]);
  javaScriptCallToSwift.updateCardList(dataStr);
  updateMoney(money);

  // render
  renderMoney(money)
  removeGlow(cardEffect);
  setTimeout(() => {
    turnOver(cardCover);
    rollListDOM.classList.add('trans');
    roll(rollListDOM);
  },250);
}

function initMoney() {
  let money = javaScriptCallToSwift.getMoney();
  return money || 3000;
}

function renderMoney(money) {
  moneyUI.textContent = `Money: ${money}`;
}

function updateMoney(money) {
  javaScriptCallToSwift.updateMoney(money);
}

function removeGlow(element) {
  element.classList.remove('glow');
}

function turnOver(element) {
  element.classList.add('disable');
}

function roll(element) {
  element.classList.add('rolled')
}

let cardList = [
  {
    src: 'imgs/0.png',
    type: 0
  },
  {
    src: 'imgs/1.png',
    type: 0
  },
  {
    src: 'imgs/2.png',
    type: 1
  },
  {
    src: 'imgs/3.png',
    type: 0
  },
  {
    src: 'imgs/4.png',
    type: 2
  },
  {
    src: 'imgs/5.png',
    type: 0
  },
  {
    src: 'imgs/6.png',
    type: 3
  },
  {
    src: 'imgs/7.png',
    type: 0
  },
  {
    src: 'imgs/8.png',
    type: 1
  },
  {
    src: 'imgs/9.png',
    type: 1
  }
];
