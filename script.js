let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let lapTimes = []; // Array to store lap times

const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function updateTime() {
  elapsedTime = Date.now() - startTime;
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  timerElement.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function recordLap() {
  const currentLapTime = elapsedTime;
  lapTimes.push(currentLapTime);
  const lapList = document.getElementById('laps');

  // Clear previous lap list entries before adding a new one
  lapList.innerHTML = '<h2>Laps</h2>';

  for (let i = 0; i < lapTimes.length; i++) {
    const newLap = document.createElement('p');
    const lapNumber = i + 1;
    const lapTime = lapTimes[i];
    const lapHours = Math.floor((lapTime / (1000 * 60 * 60)) % 24);
    const lapMinutes = Math.floor((lapTime / (1000 * 60)) % 60);
    const lapSeconds = Math.floor((lapTime / 1000) % 60);
    newLap.innerText = `Lap ${lapNumber}: ${lapHours.toString().padStart(2, '0')}:${lapMinutes.toString().padStart(2, '0')}:${lapSeconds.toString().padStart(2, '0')}`;
    lapList.appendChild(newLap);
  }
}

startButton.addEventListener('click', () => {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(updateTime, 10);
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
  lapButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  startButton.disabled = false;
  stopButton.disabled = true;
});

resetButton.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  startTime = 0;
  elapsedTime = 0;
  lapTimes = [];
  timerElement.innerText = '00:00:00';
  const lapList = document.getElementById('laps');
  lapList.innerHTML = '<h2>Laps</h2>';  // Clear lap list
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;
});

lapButton.addEventListener('click', () => {
  if (intervalId) { // Only record lap if stopwatch is running
    recordLap();
  }
});
