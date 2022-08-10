import React, { useContext } from "react";
import { AppContext } from "../../../store/store";
import { DayTab } from "./DayTab";
import { DayView } from "./DayView";

const DayViewList: React.FC = () => {
  // const days = useSelector((state: RootState)=> state.workDays.days);
  const { state } = useContext(AppContext);
  const days = state.workDays.days;
  const dayList = days.map((el) => (
    <DayTab
      data={el}
      key={el.id}
      selected={el.id === state.workDays.selected}
    />
  ));
  return (
    <div className="grid">
      <div
        className="grid grid-flow-col justify-start
                      overflow-auto rounded-t-lg"
      >
        {dayList}
      </div>
      <DayView />
    </div>
  );
};

export { DayViewList };
