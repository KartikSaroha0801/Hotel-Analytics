import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({ selectedDates, onDatesChange }) => {
  const [startDate, setStartDate] = useState(selectedDates.startDate);
  const [endDate, setEndDate] = useState(selectedDates.endDate);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    onDatesChange({ startDate: start, endDate: end });
  };

  return (
    <div className="date-selector">
      <h2>Select Date Range</h2>
      <DatePicker
        selected={startDate}
        onChange={setStartDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={setEndDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </div>
  );
};

export default DateSelector;
