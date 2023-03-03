import React, { useState, ReactNode } from "react";
import GlobalContext from "./globalContext";
import dayjs from "dayjs";

const ContextWrapper = (props: {children: ReactNode}) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  return (
    <GlobalContext.Provider value={{ monthIndex, setMonthIndex }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;