'use strict';

let highscore = 0;
let score = 20;
let guess = '';
let interval;
let secretNumber = 0;

let generateNumber = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log('Number: ' + secretNumber);
};

const displayMessage = function (location, message) {
  document.querySelector(location).textContent = message;
};
const setWidth = function (location, width) {
  document.querySelector(location).style.width = width;
};
const setBackgroundColor = function (location, color) {
  document.querySelector(location).style.backgroundColor = color;
};

function startBlinking() {
  interval = setInterval(() => {
    setBackgroundColor('.number', '#60b347');
    setBackgroundColor('body', '#6CA35E');
    setTimeout(() => {
      // setBackgroundColor('.number', 'transparent');
      setBackgroundColor('.number', '#6CA35E');
      setBackgroundColor('body', '#60b347');
    }, 300);
  }, 800);
}

function stopBlinking() {
  clearInterval(interval);
  setBackgroundColor('.number', '#eee');
  setBackgroundColor('body', '#222');
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log('Guess: ' + guess + ' ' + 'Score: ' + score);
  check(guess);
});

function check(guess) {
  if (score === 1) {
    displayMessage('.message', 'You lost the game!');
    displayMessage('.score', '0');
  } else if (!guess) {
    displayMessage('.message', 'No number!');
  } else if (guess === secretNumber) {
    startBlinking();
    displayMessage('.message', 'Correct!');
    setWidth('.number', '30rem');
    displayMessage('.number', secretNumber);
    highscore = score > highscore ? (highscore = score) : highscore;
    displayMessage('.highscore', highscore);
  } else {
    document.querySelector('.message').textContent =
      guess > secretNumber ? ' Too high!' : 'Too low!';
    score--;
    displayMessage('.score', score);
  }
  return guess;
}

document.querySelector('.again').addEventListener('click', function () {
  stopBlinking();
  guess = '';
  score = 20;
  displayMessage('.number', '?');
  setWidth('.number', '15rem');
  displayMessage('.message', 'Start guessing...');
  document.querySelector('.guess').value = '';
  displayMessage('.score', score);
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log('Number: ' + secretNumber);
});

generateNumber(secretNumber);
