function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

let startBtn = document.querySelector('.button-start');
let stopBtn = document.querySelector('.button-stop');
let bodyRef = document.querySelector('body');

let timer = null;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

function onStart() {
    timer = setInterval(bgColor, 1000);
    startBtn.toggleAttribute('disabled');
   
} 

function onStop() {
    clearInterval(timer);

    startBtn.removeAttribute('disabled');
};

function bgColor() {
bodyRef.style.backgroundColor = getRandomHexColor();
}
