import React, { useState, useEffect, useRef } from 'react';
import './CountdownTimer.css'; // Import the CSS file

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime === 0) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (isPaused) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused]);

  const handleStart = () => {
    setTime(minutes * 60 + seconds);
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(prevState => !prevState);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = time => {
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
        <button onClick={handleStart}>START</button>
      </div>
      <div className="button-container">
        <button onClick={handlePauseResume}>{isPaused ? 'RESUME' : 'PAUSE'}</button>
        <button onClick={handleReset}>RESET</button>
      </div>
      <div className="time-display">
        <h1>{formatTime(time)}</h1>
      </div>
    </div>
  );
};

export default CountdownTimer;
