const DAY = document.querySelector('.day');
const HOURS = document.querySelector('.hour');
const MINS = document.querySelector('.minute');
const SECS = document.querySelector('.second');
const REVERSE_TIMER = document.querySelector('.reverse-timer');

const LAUNCH_YEAR = document.querySelector('.launch-year');
const LAUNCH_MONTH = document.querySelector('.launch-month');
const LAUNCH_WEEK = document.querySelector('.launch-week');
const LAUNCH_DATE = document.querySelector('.launch-date');
const LAUNCH_TIME = document.querySelector('.launch-time');

const WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formatTime = function (launchTime) {
  const period = launchTime.slice(-2);
  const [h, m] = launchTime.split(':');
  return `${h}:${m} ${period}`;
};

const displayLaunchDate = function (launchDate) {
  LAUNCH_YEAR.textContent = launchDate.getFullYear();
  LAUNCH_MONTH.textContent = MONTH[launchDate.getMonth()];
  LAUNCH_WEEK.textContent = WEEK[launchDate.getDay()];
  LAUNCH_DATE.textContent = launchDate.getDate();
  LAUNCH_TIME.textContent = formatTime(launchDate.toLocaleTimeString());
};

const createLaunchDate = function (
  year = 0,
  month = 0,
  day = 0,
  hour = 0,
  minute = 0,
  second = 0
) {
  const launchDate = new Date(year, month, day, hour, minute, second);

  displayLaunchDate(launchDate);

  return launchDate.getTime();
};
const launchDate__seconds = createLaunchDate(2022, 0, 1, 0, 0, 1); // in milliseconds

const displayTime = function (days, hours, mins, secs) {
  DAY.textContent = days.toString().padStart(2, '0');
  HOURS.textContent = hours.toString().padStart(2, '0');
  MINS.textContent = mins.toString().padStart(2, '0');
  SECS.textContent = secs.toString().padStart(2, '0');
};

const calcTimer = function (difference) {
  let days = Math.floor(difference / (24 * 60 * 60 * 1000)); // 1 day = 24 * 60 * 60 * 1000 milliseconds
  difference -= days * 24 * 60 * 60 * 1000; // leftover time in milliseconds

  let hours = Math.floor(difference / (60 * 60 * 1000)); // 1 hour = 60 * 60 * 1000 milliseconds
  difference -= hours * 60 * 60 * 1000; // leftover time in milliseconds

  let mins = Math.floor(difference / (60 * 1000)); // 1 min = 60 * 1000 milliseconds
  difference -= mins * 60 * 1000; // leftover time in milliseconds

  let secs = Math.floor(difference / 1000); // 1 sec = 1000 milliseconds

  return [days, hours, mins, secs];
};

let timer = setInterval(function () {
  let todayDate = new Date();
  let todayDate__seconds = todayDate.getTime(); // in milliseconds

  let difference = launchDate__seconds - todayDate__seconds; // in milliseconds

  if (difference < 0) {
    // launch date has expired
    displayTime('00', '00', '00', '00');
    REVERSE_TIMER.innerHTML = "<button class='btn shop-btn'>SHOP NOW</button>";
    clearInterval(timer);

    return;
  }

  let [days, hours, mins, secs] = calcTimer(difference);
  displayTime(days, hours, mins, secs);
}, 1000);
