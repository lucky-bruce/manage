import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function DateSelect(props) {
  const [from, setfrom] = useState(false);
  const [to, setto] = useState(false);

  return (
    <div className="">
      <button className="btn border mr-3" onClick={() => setfrom(!from)}>
        {props.from ? props.from.toLocaleDateString("en-US") : "Date from"}
      </button>
      <span className={`position-absolute ${from ? "" : "d-none"}`}>
        <DatePicker
          calendarClassName="cal"
          onChange={date => {
            props.onFromChange(date);
            setfrom(false);
          }}
          selected={props.from}
          inline
          maxDate={new Date()}
        />
      </span>
      <button className="btn border" onClick={() => setto(!to)}>
        {props.to ? props.to.toLocaleDateString("en-US") : "Date to"}
      </button>
      <span className={` position-absolute ${to ? "" : "d-none"}`}>
        <DatePicker
          onChange={date => {
            props.onToChange(date);
            setto(false);
          }}
          maxDate={new Date()}
          showDisabledMonthNavigation
          calendarClassName="cal"
          selected={props.to}
          inline
        />
      </span>
    </div>
  );
}
