import React from 'react';
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePiker = (props) => {
  const {
    showIcon,
    openToDate,
    selected,
    startDate,
    endDate,
    onChange,
    selectsRange,
    monthsShown,
    showMonthDropdown,
    minTime,
    minDate,
    showYearDropdown,
    defaultDate,
    inline,
    ...p
  } = props


  const changeDate = (date) => {
    if (Array.isArray(date)) {
      const [start, end] = date

      onChange([
        start ? moment(start).format("YYYY-MM-DD") : null,
        end ? moment(end).format("YYYY-MM-DD") : null,
      ])
    } else onChange(moment(date).format("YYYY-MM-DD"))

  }

  return (
    <ReactDatePicker
      showIcon={showIcon}
      selected={startDate ? new Date(startDate) : selected}
      startDate={startDate ? new Date(startDate) : null}
      endDate={endDate ? new Date(endDate) : null}
      onChange={changeDate}
      selectsRange={selectsRange}
      monthsShown={monthsShown}
      showYearDropdown={showYearDropdown}
      showMonthDropdown={showMonthDropdown}
      openToDate={openToDate}
      minTime={minTime}
      minDate={minDate}
      defaultDate={defaultDate}
      inline={inline}
      {...p}

    />
  );
};

export default DatePiker;


