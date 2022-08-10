import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../store/store";

interface IDayTabProps {
  data: any;
  selected?: boolean;
}

const DayTab: React.FC<IDayTabProps> = (props: IDayTabProps) => {
  const { dispatch } = useContext(AppContext);
  const [selectedClasses, setSelectedClasses] = useState<string>("");

  useEffect(() => {
    console.log("day view", props.selected);
    props.selected ? setSelectedClasses("bg-gray-500 text-white") :
      setSelectedClasses("bg-gray-200 text-gray-600");
  }, [props.selected]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()}`;
  };

  return (
    <div
      className={`p-05 cursor-pointer font-bold select-none
                  border-r border-r-gray-300
                  ${selectedClasses}`}
      onClick={() =>
        dispatch({ type: "SELECT_WORK_DAY", payload: props.data.id })
      }
    >
      {formatDate(props.data.start)}
    </div>
  );
};

export { DayTab };
