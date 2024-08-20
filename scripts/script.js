const timeString = document.getElementById("timer-container");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

function stopwatch() {
  let ms = 0;
  let s = 0;
  let m = 0;
  let h = 0;

  function millisecond() {
    ms++;
    if (ms > 99) {
      ms = 0;
      second();
    }
  }

  function second() {
    s++;
    if (s > 59) {
      s = 0;
      minute();
    }
  }

  function minute() {
    m++;
    if (m > 59) {
      m = 0;
      hour();
    }
  }

  function hour() {
    h++;
  }

  function getTimer() {
    return [h, m, s, ms];
  }

  function resetTimer() {
    ms = 0;
    s = 0;
    m = 0;
    h = 0;
    timeString.textContent = `00:00:00.00`;
  }

  return {
    millisecond: millisecond,
    getTimer: getTimer,
    resetTimer: resetTimer,
  };
}

const startWatch = stopwatch();

let timeoutID;

startBtn.addEventListener("click", () => {
  startBtn.setAttribute("disabled", true);
  stopBtn.removeAttribute("disabled");
  resetBtn.setAttribute("disabled", true);

  timeoutID = setInterval(() => {
    startWatch.millisecond();
    let [hours, minutes, seconds, milliseconds] = startWatch.getTimer();
    hours = hours.toString().padStart(2, 0);
    minutes = minutes.toString().padStart(2, 0);
    seconds = seconds.toString().padStart(2, 0);
    milliseconds = milliseconds.toString().padStart(2, 0);

    timeString.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }, 10);
});

stopBtn.addEventListener("click", () => {
  startBtn.removeAttribute("disabled");
  resetBtn.removeAttribute("disabled");
  clearInterval(timeoutID);
  stopBtn.setAttribute("disabled", true);
});

resetBtn.addEventListener("click", () => {
  startBtn.removeAttribute("disabled");
  startWatch.resetTimer();
  resetBtn.setAttribute("disabled", true);
});

/* EFFICIENT CODE WRITING FOR STOPWATCH */

// const timerDisplay = document.getElementById("timer-container");
// let currentTime = 0;

// function start() {
//   currentTime = Date.now();
// }

// function updateTime() {
//   let newTime = Date.now();
//   let elapsedTime = newTime - currentTime;
//   let hour = Math.floor(elapsedTime / 1000 / 60 / 60);
//   let minute = Math.floor((elapsedTime / 1000 / 60) % 60);
//   let second = Math.floor((elapsedTime / 1000) % 60);
//   let millisecond = elapsedTime % 1000;

//   second = second.toString().padStart(2, 0);
//   minute = minute.toString().padStart(2, 0);
//   hour = hour.toString().padStart(2, 0);
//   millisecond = millisecond.toString().padStart(3, 0);

//   timerDisplay.textContent = `${hour}:${minute}:${second}.${millisecond}`;
// }
// let timeoutID;
// const startBtn = document.getElementById("startBtn");
// startBtn.addEventListener("click", () => {
//   start();
//   timeoutID = setInterval(updateTime, 1);
// });

// const stopBtn = document.getElementById("stopBtn");
// stopBtn.addEventListener("click", () => {
//   clearInterval(timeoutID);
// });
