
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduledAvailability = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (date) => {
    const now = new Date();
    if (date <= now) {
      setError('Scheduled date must be in the future.');
    } else {
      setError('');
      setStartDate(date);
      onDateChange(date);
    }
  };

  return (
    <div>
      <label>Scheduled Availability:</label>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="Pp"
        placeholderText="Select a date and time"
        minDate={new Date()} 
        required
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

export default ScheduledAvailability;
