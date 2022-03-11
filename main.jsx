function App() {
  const [breakTime, setBreakTime] = React.useState(5);
  const [sessionTime, setSessionTime] = React.useState(25);
  const [timeLeft, setTimeLeft] = React.useState(1500);
  const [countDownStatus, setCountDownStatus] = React.useState(false);
  const [timingType, setTimingType] = React.useState("SESSION");

  const changeBreakTime = (amount) => {
    setBreakTime((prev) => {
      if (prev >= 60 && amount > 0) {
        return 60;
      }
      if (prev <= 1 && amount < 0) {
        return 1;
      } else {
        return prev + amount;
      }
    });
  };

  const changeSessionTime = (amount) => {
    setSessionTime((prev) => {
      if (prev >= 60 && amount > 0) {
        return 60;
      }
      if (prev <= 1 && amount < 0) {
        return 1;
      } else {
        return prev + amount;
      }
    });
    setTimeLeft((prev) => {
      if (prev >= 3600 && amount > 0) {
        return 60 * 60;
      }
      if (prev <= 60 && amount < 0) {
        return 1 * 60;
      } else {
        return prev + amount * 60;
      }
    });
  };

  const formatTime = (t) => {
    let minutes =
      Math.floor(t / 60) < 10 ? "0" + Math.floor(t / 60) : Math.floor(t / 60);
    let seconds = t % 60 < 10 ? "0" + (t % 60) : t % 60;
    return minutes + ":" + seconds;
  };

  const timeFormated = formatTime(timeLeft);

  const timeOut = setTimeout(() => {
    if (countDownStatus && timeLeft) {
      setTimeLeft((prev) => prev - 1);
    }
  }, 1000);

  const controlCountDown = () => {
    clearTimeout(timeOut);
    setCountDownStatus(!countDownStatus);
  };

  const clearCountDown = () => {
    setSessionTime(25);
    setBreakTime(5);
    setTimeLeft(1500);
    clearTimeout(timeOut);
    setCountDownStatus(false);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  React.useEffect(() => {
    if (countDownStatus && !timeLeft) {
      document.getElementById("beep").play();
      setTimeLeft(breakTime * 60);
      setTimingType("BREAK");
    }
    if (timingType =="BREAK" && !timeLeft) {
      document.getElementById("beep").currentTime = 0;
      setTimeLeft(sessionTime * 60);
      setTimingType("SESSION");
    }
  });

  return (
    <div className="container">
      <div className="main-title">25 + 5 Clock</div>

      <div className="length-control">
        <div id="break-label">Break Length</div>
        <button
          className="btn-level"
          id="break-decrement"
          disabled={countDownStatus}
          onClick={() => changeBreakTime(-1)}
        >
          <i className="fa fa-arrow-down fa-2x"></i>
        </button>
        <div className="btn-level" id="break-length">
          {breakTime}
        </div>
        <button
          className="btn-level"
          id="break-increment"
          disabled={countDownStatus}
          onClick={() => changeBreakTime(1)}
        >
          <i className="fa fa-arrow-up fa-2x"></i>
        </button>
      </div>

      <div className="length-control">
        <div id="session-label">Session Length</div>
        <button
          className="btn-level"
          id="session-decrement"
          disabled={countDownStatus}
          onClick={() => changeSessionTime(-1)}
        >
          <i className="fa fa-arrow-down fa-2x"></i>
        </button>
        <div className="btn-level" id="session-length">
          {sessionTime}
        </div>
        <button
          className="btn-level"
          id="session-increment"
          disabled={countDownStatus}
          onClick={() => changeSessionTime(1)}
        >
          <i className="fa fa-arrow-up fa-2x"></i>
        </button>
      </div>

      <div className="timer">
        <div className="timer-wrapper">
          <div id="timer-label">{timingType}</div>
          <div id="time-left">{timeFormated}</div>
        </div>

        <div className="timer-control">
          <button id="start_stop" onClick={controlCountDown}>
            <i class="fa fa-play fa-2x"></i>
            <i class="fa fa-pause fa-2x"></i>
          </button>
          <button id="reset" onClick={clearCountDown}>
            <i class="fa fa-refresh fa-2x"></i>
          </button>
        </div>
      </div>

      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
