import { useState, useEffect, useRef } from 'react';

export default function useTimer(startTime, onTimeUp, isRunning) {
  const [timeLeft, setTimeLeft] = useState(startTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const reset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(startTime);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return { timeLeft, reset, stop };
}
