import React, { useState } from 'react';
import './calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Helper function to get the days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper function to get the first day of the month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  const handleDayClick = (day, month, year) => {
    setSelectedDate({ day, month, year });
  };

  const renderDays = () => {
    const days = [];
    // Add empty days before the start of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day" />);
    }
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isSunday = date.getDay() === 0;
      const isCurrentDay = i === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear();
      
      days.push(
        <div
          key={i}
          className={`day ${isSunday ? 'sunday' : ''} ${isCurrentDay ? 'current-day' : ''}`}
          onClick={() => handleDayClick(i, currentMonth, currentYear)}
        >
          {i}
        </div>
      );
    }
    return days;
  };
  

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth} aria-label="Previous Month">{'<'}</button>
        <div>{`${monthNames[currentMonth]} ${currentYear}`}</div>
        <button onClick={handleNextMonth} aria-label="Next Month">{'>'}</button>
      </div>
      <div className="selected-date">
        {selectedDate ? (
          <div>{`${monthNames[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`}</div>
        ) : (
          <div>Select a date</div>
        )}
      </div>
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-of-week">{day}</div>
        ))}
      </div>
      <div className="days">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
