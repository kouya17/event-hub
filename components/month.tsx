import dayjs from "dayjs";
import React from "react";
import { Day } from "./day";

export const Month = (props: { month: dayjs.Dayjs[][] }) => {
  const { month } = props;
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};