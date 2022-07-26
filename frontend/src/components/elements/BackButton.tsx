import React from "react";
import { useNavigate } from "react-router-dom";
import { MaterialIcons } from "./MaterialIcons";

interface IBackButton {
  backTo: string;
  title?: string;
}

const BackButton: React.FC<IBackButton> = (props: IBackButton) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(props.backTo, { replace: true });
  };

  return (
    <div className="grid grid-cols-3">
      <span className="cursor-pointer" onClick={handleClick}>
        <MaterialIcons name="arrow_back" />
      </span>
      <h1 className="text-center text-gray-500 font-bold text-2xl">
        {props.title}
      </h1>
    </div>
  );
};

export { BackButton };
