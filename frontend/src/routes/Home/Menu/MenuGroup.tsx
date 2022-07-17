import React, { useState } from "react";
import {MaterialIcons} from "../../../components/elements/MaterialIcons";

interface IMenuGroupProps {
  name: string;
  children?: JSX.Element | JSX.Element[];
  onClick?: CallableFunction;
}

const MenuGroup: React.FC<IMenuGroupProps> = (props: IMenuGroupProps) => {
  const [isExpanded, setExpanded] = useState<Boolean>(false);
  const handleToggleExpand = () => {
    setExpanded(!isExpanded);
    if (props.onClick && isExpanded === false) {
      props.onClick();
    }
  };

  return (
    <div
      className={
        "transition duration-1000 " +
        "overflow-hidden border-b-2 border-b-indigo-400" +
        (isExpanded ? " max-h-full" : " max-h-[3rem]")
      }
    >
      <div
        className="flex justify-between
                 hover:bg-blue-400 p-05 px-1 transition cursor-pointer
                   whitespace-nowrap select-none"
        onClick={handleToggleExpand}
      >
        <span className="font-bold">{props.name}</span>
        {isExpanded ? (
          <MaterialIcons name="expand_less" />
        ) : (
          <MaterialIcons name="expand_more" />
        )}
      </div>
      <div className="flex flex-col">{props.children}</div>
    </div>
  );
};

export { MenuGroup };
