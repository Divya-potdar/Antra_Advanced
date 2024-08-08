import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTime, startTimer, pauseResumeTimer, resetTimer, decrementTime } from '../Reducers/reducers'; 
const CountdownTimer = () => {
  const dispatch = useDispatch();
  const { time, isActive, isPaused } = useSelector((state) => state.countdown);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
    } else if (isPaused) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, dispatch]);

  const handleStart = () => {
    const totalSeconds = minutes * 60 + seconds;
    dispatch(setTime(totalSeconds));
    dispatch(startTimer());
  };

  const handlePauseResume = () => {
    dispatch(pauseResumeTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  const formatTime = (time) => {
    const getMinutes = Math.floor(time / 60);
    const getSeconds = time % 60;
    return `${String(getMinutes).padStart(2, '0')}:${String(getSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <h1>Timer</h1>
      <div className="input-container">
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          placeholder="Minutes"
          disabled={isActive}
        />
        <span>Minutes</span>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          placeholder="Seconds"
          disabled={isActive}
        />
        <span>Seconds</span>
        <button onClick={handleStart}>Start</button>
      </div>
      <div className="button-container">
        <button onClick={handlePauseResume}>{isPaused ? 'Resume' : 'Pause'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="time-display">
        <h1>{formatTime(time)}</h1>
      </div>
    </div>
  );
};

export default CountdownTimer;
