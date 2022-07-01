import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialIcons } from './MaterialIcons';


interface IBackButton {
  backTo: string;
}


const BackButton:React.FC<IBackButton> = (props: IBackButton) => {
  const navigate = useNavigate();
  const hangleClick = () => {
    navigate(props.backTo, {replace: true});
  };

  return (
    <span className="cursor-pointer" onClick={hangleClick}>
      <MaterialIcons name="arrow_back"/>
    </span>
  );
};

export {BackButton};
