
const card = document.querySelectorAll('.cell');
const front = document.querySelectorAll('.front');
const container = document.querySelector('.container');
const score = document.querySelector('.score span');
const movesDisplay = document.querySelector('.moves span');
const startButton = document.querySelector('.start-button');
const timerDisplay = document.querySelector('.timer');
var start = document.querySelector('start')

let moves = 0;
let seconds = 0;
let minutes = 0;
let timerInterval;

startButton.addEventListener('click', startGame);

function startGame() {
  startButton.disabled = true; 
  suffleImage();
  startTimer();
}

function suffleImage() {
  card.forEach(c => {
    const num = [...Array(card.length).keys()];
    const random = Math.floor(Math.random() * card.length);
    c.style.order = num[random];
  });
}

function clicking() {
  for (let i = 0; i < card.length; i++) {
    front[i].classList.add('show');
    setInterval(() => {
      front[i].classList.remove('show');
    }, 2000);

    card[i].addEventListener('click', () => {
      front[i].classList.add('flip');
      const flippedCard = document.querySelectorAll('.flip');

      if (flippedCard.length === 2) {
        container.style.pointerEvents = 'none';

        setTimeout(() => {
          container.style.pointerEvents = 'all';
        }, 1000);

        match(flippedCard[0], flippedCard[1]);
      }

      moves += 1;
      movesDisplay.textContent = moves;
    });
  }
}

function match(cardOne, cardTwo) {
  if (cardOne.dataset.index === cardTwo.dataset.index) {
    score.innerHTML = parseInt(score.innerHTML) + 1;
    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');
    cardOne.classList.add('match');
    cardTwo.classList.add('match');
  } else {
    setTimeout(() => {
      cardOne.classList.remove('flip');
      cardTwo.classList.remove('flip');
    }, 1000);
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    seconds += 1;
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    const secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    const minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timerDisplay.textContent = `${minutesValue}:${secondsValue}`;
  }, 1000);
}

clicking();
