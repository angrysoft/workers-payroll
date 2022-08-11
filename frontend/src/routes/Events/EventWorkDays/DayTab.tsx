import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../store/store";

interface IDayTabProps {
  date: string;
  selected?: boolean;
}

const DayTab: React.FC<IDayTabProps> = (props: IDayTabProps) => {
  const { dispatch } = useContext(AppContext);
  const [selectedClasses, setSelectedClasses] = useState<string>("");

  useEffect(() => {
    props.selected ? setSelectedClasses("bg-gray-500 text-white") :
      setSelectedClasses("bg-gray-200 text-gray-600");
  }, [props.selected]);


  return (
    <div
      className={`p-05 cursor-pointer font-bold select-none
                  border-r border-r-gray-300
                  ${selectedClasses}`}
      onClick={() =>
        dispatch({ type: "SELECT_WORK_DAY", payload: props.date})
      }
    >
      {props.date}
    </div>
  );
};

export { DayTab };
