import React from "react";

interface ITableHeaderProps {
  names?: string[];
}
export const TableHeader = (props: ITableHeaderProps) => {
  const headerRow = (name: string, index:number) => {
    return (
      <th key={index} scope="col" className="p-1">
        {name}
      </th>
    );
  };

  if (!props.names) {
    return <></>;
  }

  return (
    <thead
      className="text-xs text-gray-700 uppercase
                    bg-gray-50"
    >
      <tr>{props.names.map(headerRow)}</tr>
    </thead>
  );
};
