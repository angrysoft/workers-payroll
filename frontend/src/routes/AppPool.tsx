import React from "react";
import { AppLink } from "../components/elements/AppLink";

const AppPool: React.FC = () => {
  return (
    <div className="grid gap-2 grid-flow-col auto-cols-max
                    justify-center content-center justify-items-center
                    h-full w-full p-2">
      <AppLink name="Events" url="/events/" />
      <AppLink name="Workers" url="/workers/1" />
    </div>
  );
};

export { AppPool };
