(function(){
  const hour = document.getElementById("hour");
  const minute = document.getElementById("minute");
  const second = document.getElementById("second");
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");
  let countdownTimer = null;
  
  /* 
    the timer commences with the start button, 
   so make it the first function to execute
   On start we want the seconds, minutes and hours to move and 
   setinterval to start
  */
  start.addEventListener("click", function() {
    if(hour.value == 0 && minute.value == 0 && second.value == 0) {
      return;
    }

    function startTimer() {
      start.style.display = "none";
      stop.style.display = "initial";
      countdownTimer = setInterval(function() {
          timer();
      }, 1000);
    }
    
    startTimer();
  })

  /*
    When timer is stopped, clear the interval
  */
  function stopInterval(state) {
    start.innerHTML =  state === "pause" ? "Continue" : "Start";
    stop.style.display = "none";
    start.style.display = "initial";
    clearInterval(countdownTimer);
  }

  /*
    when the interval starts, set the correct times fo reach hand(min,sec.,hr) 
    and consider edge cases
  */
  function timer() {
    if(second.value > 60) {
      minute.value++;
      second.value = second.value - 59;
    }
    if(minute.value > 60) {
      hour.value++;
      minute.value = minute.value - 59;
    }

    if(hour.value == 0 && minute.value == 0 && second.value == 0) {
      hour.value = '';
      minute.value = '';
      second.value = '';
      stopInterval();
    }
    else if(second.value != 0) {
      second.value = `${second.value <= 10 ? "0" : ""}${second.value - 1}`;
    }
    else if(minute.value != 0 && second.value == 0) {
      second.value = 59;
      minute.value = `${minute.value <= 10 ? "0" : ""}${minute.value - 1}`;
    }
    else if(hour.value != 0 && minute.value == 0) {
      minute.value = 60;
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
    }
    return;
  }

  stop.addEventListener("click", function() {
    stopInterval("pause");
  });

  reset.addEventListener("click", function() {
    hour.value = '';
    minute.value = '';
    second.value = '';
    stopInterval();
  });
})()