import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('input[type="text"]');
// console.log(input);
const refs = {
btnStart: document.querySelector('button[data-start]'),
dataDays: document.querySelector('span[data-days]'),
dataHours: document.querySelector('span[data-hours]'),
dataMinutes: document.querySelector('span[data-minutes]'),
dataSeconds: document.querySelector('span[data-seconds]'),
}

const currentDate = Date.now();
let deltaTime = 0;
// let selectedDate = null;

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
if (selectedDates[0] > currentDate) {
  refs.btnStart.disabled = false;
  return;
} else {
  refs.btnStart.disabled = true;
  Notify.failure('Please choose a date in the future')
}}};

const dataPickr = new flatpickr("input", options);

const timer = {
  intervalId: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    };
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now()
      const selectedDate = dataPickr.selectedDates[0];
      // console.log(selectedDate);
      // console.log(currentTime);
      const deltaTime = selectedDate - currentTime;
      // console.log(deltaTime);
      const period = convertMs(deltaTime);
      
      updateTimer(period);
      // console.log(`${days}:${hours}:${minutes}:${seconds}`);

      if(deltaTime <= 1000) {
        clearInterval(this.intervalId);
        this.isActive = false;
      }
    }, 1000);
  },
};

refs.btnStart.addEventListener('click', () => {
  timer.start();
});


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
};  

