import React from "react";
import { useNavigate } from "react-router-dom";
import MenuAction from "../Menu/MenuAction";
import { MenuGroup } from "../Menu/MenuGroup";

const CoordinatorActions: React.FC = () => {
  const navigate = useNavigate();
  const printReport = () => {
    window.print();
  };

  const loadRoute = (url: string) => {
    navigate(url, { replace: true });
  };

  return (
    <>
      <MenuGroup name="Workers">
        <MenuAction
          name="Worker List"
          handleAction={() => loadRoute("/home/workers")}
          icon="groups"
        />
        <MenuAction
          name="Add New Worker"
          handleAction={printReport}
          icon="person_add"
        />
        <MenuAction
          name="Remove Worker"
          handleAction={printReport}
          icon="person_remove"
        />
        <MenuAction
          name="Edit Worker"
          handleAction={printReport}
          icon="manage_accounts"
        />
      </MenuGroup>
      <MenuGroup name="Events">
        <MenuAction
          name="Event List"
          handleAction={printReport}
          icon="groups"
        />
        <MenuAction
          name="Add New Event"
          handleAction={printReport}
          icon="add"
        />
        <MenuAction
          name="Remove Event"
          handleAction={printReport}
          icon="remove"
        />
        <MenuAction name="Edit Event" handleAction={printReport} icon="edit" />
      </MenuGroup>
      <MenuAction
        name="Logout"
        handleAction={() => loadRoute("/logout")}
        icon="logout"
      />
    </>
  );
};

export { CoordinatorActions };
