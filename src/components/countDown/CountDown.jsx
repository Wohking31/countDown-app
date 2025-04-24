import React, { useState, useEffect } from 'react';
import './countDown.css'

const CountDown = () => {
  // Set target date to Christmas 2025 (December 25, 2025)
  const targetDate = new Date("May 20, 2025 00:00:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Update countdown every second
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      // Calculate time units
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Update state
      setTimeLeft({ days, hours, minutes, seconds });
      
      // Clear interval if we reach the target date
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  // Component for each time unit display
  const TimeUnit = ({ value, label }) => (
    <div className="time-unit">
      <div className="time-value">{value}</div>
      <div className="time-label">{label}</div>
    </div>
  );

  return (
    <div className="countdown-container">
      <h1 className="countdown-heading">csountDown to 20th May 2025</h1>
      <div className="time-units-container">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
      <p className="days-remaining">
        Days left until 20th May: <span className="font-bold">{timeLeft.days}</span>
      </p>
    </div>
  );
};

export default CountDown;