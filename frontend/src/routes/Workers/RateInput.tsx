import React from 'react';
import Input from '../../components/elements/Input';


interface IRateInputProps {
  id: string;
  name: string;
  value: number;
  overtime: number;
  overtime_after:number;
}


const RateInput:React.FC<IRateInputProps> = (props:IRateInputProps) => {
  return (
    <div>
      <span>{props.name}</span>
      <Input type='number' label='Value' id="value" />
      <Input type='number' label='Overtime value' id="overtime"/>
      <Input type='number' label='Overtime after' id="overtime_after"/>
    </div>
  );
};

export {RateInput};
