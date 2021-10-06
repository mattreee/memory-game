const cardsDiv = document.querySelector('#cards-div');
const scoreSpan = document.querySelector('#score-span');
const failedSpan = document.querySelector('#failed-attempts-span');
const startButton = document.querySelector('#start-game');

let cardsDisplay = [];
let cardsZero = [];
let cardsOne = [];
let cardsTwo = [];

/* addNumbers() e fixAmount() servem para selecionar a ordem em que os cards serão dispostos */

addNumbers();
function addNumbers(){
  while(cardsDisplay.length < 6){
    cardsDisplay.push(Math.round(Math.random() * 2));
  }
  cardsDisplay.forEach(elem => {
    if (elem === 0){
      cardsZero.push('0');
    }
    else if(elem === 1){
      cardsOne.push('1');
    }
    else if(elem === 2){
      cardsTwo.push('2');
    }
  })
  console.log(cardsDisplay);
  fixAmount();
}

function fixAmount(){
  while(cardsZero.length > 2){
    cardsDisplay.splice(cardsDisplay.lastIndexOf(0), 1);
    cardsZero.pop();
  }
  while(cardsOne.length > 2){
    cardsDisplay.splice(cardsDisplay.lastIndexOf(1), 1);
    cardsOne.pop();
  }
  while(cardsTwo.length > 2){
    cardsDisplay.splice(cardsDisplay.lastIndexOf(2), 1);
    cardsTwo.pop();
  }

  if(cardsZero.length != 2 || cardsOne.length != 2 || cardsTwo.length != 2){
    cardsZero = [];
    cardsOne = [];
    cardsTwo = [];
    addNumbers();
  }
}

startButton.addEventListener('click', appendCards);

let createCardImg;
let playerPick = [];
let matchArray = [];

const cards = {
  back: 'cards/back.jpg',
  circle: 'cards/circle.jpg',
  square: 'cards/square.jpg',
  triangle: 'cards/triangle.jpg'
}

function appendCards(){
  cardsDisplay.forEach(elem => {
    createCardImg = document.createElement('img');
    createCardImg.classList.add('card', 'unmatched');
    cardsDiv.append(createCardImg);

    startButton.setAttribute('disabled', '');

    if(elem === 0){
      createCardImg.classList.add('circle');
      createCardImg.src = cards.back;
    }
    else if(elem === 1){
      createCardImg.classList.add('square');
      createCardImg.src = cards.back;
    }
    else if(elem === 2){
      createCardImg.classList.add('triangle');
      createCardImg.src = cards.back;
    }
  })
}

window.onclick = function(e){
  if(e.target.classList.contains('circle')){
    e.target.src = cards.circle;
    playerPick.push('circle');
    matchArray.push(e.target);
  }
  else if(e.target.classList.contains('square')){
    e.target.src = cards.square;
    playerPick.push('square');
    matchArray.push(e.target);
  }
  else if(e.target.classList.contains('triangle')){
    e.target.src = cards.triangle;
    playerPick.push('triangle');
    matchArray.push(e.target);
  }
  pairCheck();
}

function pairCheck(){
  let imgTag = document.getElementsByTagName('img');

  if(playerPick.length == 2){

    if(playerPick[0] === playerPick[1]){
      console.log('igual', playerPick);
      matchArray[0].classList.remove('unmatched');
      matchArray[1].classList.remove('unmatched');
      playerPick = [];
      matchArray = [];
    }
    else{
      console.log('não é igual', playerPick);
      
      for (let i = 0; i < imgTag.length; i++){
        if(imgTag[i].classList.contains('unmatched')){
          setTimeout(() => {
            imgTag[i].src = cards.back;
          }, 1500);
        }
      }
      playerPick = [];
      matchArray = [];
    }
  }
}