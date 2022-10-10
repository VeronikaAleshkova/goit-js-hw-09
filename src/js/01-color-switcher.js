const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

// console.log(btnStart);
// console.log(btnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const onStartClick = () => {
  btnStart.disabled = true;
  timerId = setInterval(() => {
    let currentColor;
    currentColor = getRandomHexColor();
    body.style.backgroundColor = currentColor;
  }, 1000);
};

const onStopClick = () => {
  clearInterval(timerId);
  btnStart.disabled = false;
  };

  btnStart.addEventListener('click', onStartClick);  
  btnStop.addEventListener('click', onStopClick);  

