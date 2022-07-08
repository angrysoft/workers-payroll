import React from "react";
import { Link } from "react-router-dom";

interface IAppLinkProps {
  name: string;
  url: string;
}

const AppLink: React.FC<IAppLinkProps> = (props: IAppLinkProps) => {
  return (
    <div
      className="bg-gradient-to-t from-indigo-500 to-blue-500
                 rounded-xl shadow-lg hover:shadow-xl
                 transition-shadow duration-500
                 cursor-pointer"
    >
      <Link
        className="flex text-white font-bold w-full h-full p-2"
        to={props.url}
      >
        {props.name}
      </Link>
    </div>
  );
};

export { AppLink };
