import React, { useState } from 'react';
import Timer from './components/Timer';
import './App.css';

function App() {
  const [startTime, setStartTime] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [endTime, setEndTime] = useState(null);

  const calculateEndTime = () => {
    if (!startTime || isNaN(hoursWorked)) {
      alert('Please enter both start time and hours worked.');
      return;
    }

    const [hours, minutes] = startTime.split(':').map(Number);

    // Create a Date object using the local time instead of UTC
    const start = new Date();
    start.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds

    const end = new Date(start.getTime() + hoursWorked * 60 * 60 * 1000);

    setEndTime(end);
  };

  const setCurrentTimeAsStartTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setStartTime(`${hours}:${minutes}`);
  };

  const formatTime12Hour = date => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="App">
      <h1>ClockOut Assistant</h1>
      <label>
        Start Time:
        <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
        <button className="current-time-button" onClick={setCurrentTimeAsStartTime}>Set to Current Time</button>
      </label>
      <label>
        Hours Worked:
        <input type="number" value={hoursWorked} onChange={e => setHoursWorked(e.target.value)} step="0.1" />
      </label>
      <button onClick={calculateEndTime}>Calculate End Time</button>
      {endTime && (
        <>
          <p>End Time: {formatTime12Hour(endTime)}</p>
          <Timer endTime={endTime} />
        </>
      )}
    </div>
  );
}

export default App;
