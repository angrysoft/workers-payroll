import React from 'react';


interface MenuItemProps {
  name: string;
  children?: JSX.Element | JSX.Element[];
}


const MenuItem = (props:MenuItemProps) => {
  return (
    <div>{props.name}</div>
  );
};

export default MenuItem;
