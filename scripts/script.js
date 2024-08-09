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
    timeString.textContent = `00:00:00:00`;
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
