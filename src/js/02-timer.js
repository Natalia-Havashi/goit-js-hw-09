import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const secondsData = document.querySelector('span[data-seconds]');
const minutesData = document.querySelector('span[data-minutes]');
const hoursData = document.querySelector('span[data-hours]');
const daysData = document.querySelector('span[data-days]');

btnStart.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose([selectedDates]) {
    if (selectedDates < Date.now()) {
      Notiflix.Notify.failure('This date is not valid');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(text, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function drawTimer({days, hours, minutes, seconds}) {
  daysData.textContent = addLeadingZero(days);
  hoursData.textContent = addLeadingZero(hours);
  minutesData.textContent = addLeadingZero(minutes);
  secondsData.textContent = addLeadingZero(seconds);
}



btnStart.addEventListener('click', () => {
  let timer = setInterval(function()  {
      let countdown = new Date(text.value) - Date.now();
       btnStart.disabled = true;
   if (countdown >= 0) {
   let timeObject = convertMs(countdown);
   
    drawTimer(timeObject);
   
      if(countdown <= 1000) {
        timerHtml.style.color = 'tomato';
      }
      } else {
      Notiflix.Notify.success('The countdown is complete');
      timerHtml.style.color = 'black';
      clearInterval(timer);
      
    } 
  }, 1000);
});





