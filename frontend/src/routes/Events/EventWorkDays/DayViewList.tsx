import React, { useContext } from "react";
import { AppContext } from "../../../store/store";
import { DayTab } from "./DayTab";
import { DayView } from "./DayView";

const DayViewList: React.FC = () => {
  const { state } = useContext(AppContext);
  const days = state.workDays.dates;
  const dates = days.map((el: string) => (
    <DayTab
      date={el}
      key={el}
      selected={el === state.workDays.selected}
    />),
  );

  return (
    <div className="grid">
      <div
        className="grid grid-flow-col justify-start
                      overflow-auto rounded-t-lg"
      >
        {dates}
      </div>
      <DayView />
    </div>
  );
};

export { DayViewList };
