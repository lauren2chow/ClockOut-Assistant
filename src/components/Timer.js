import React, { useState, useEffect } from 'react';

function Timer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft('00:00:00');
        alert('Time is up!'); // Trigger the alert when the countdown reaches zero
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [endTime]);

  return (
    <div>
      <h2>Time Remaining: {timeLeft}</h2>
    </div>
  );
}

export default Timer;
