import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../store/store";
import MenuAction from "../Menu/MenuAction";
import { MenuGroup } from "../Menu/MenuGroup";

const CoordinatorActions: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const printReport = () => {
    window.print();
  };

  const loadRoute = (url: string) => {
    navigate(url, { replace: true });
  };

  return (
    <>
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
      <MenuGroup name="Workers" onClick={() => loadRoute("/workers/1")}>
        <MenuAction
          name="Worker List"
          handleAction={() => loadRoute("/workers/1")}
          icon="groups"
        />
        <MenuAction
          name="Add New Worker"
          handleAction={() => loadRoute("/worker/add")}
          icon="person_add"
        />
        <MenuAction
          name="Remove Worker"
          handleAction={() => {
            if (state.table.selected) {
              loadRoute("worker/remove");
            } else {
              dispatch({
                type: "ERROR_DIALOG_SHOW",
                payload: {
                  msg: "Select worker first !",
                  show: true,
                  backTo: "",
                },
              });
            }
          }}
          icon="person_remove"
        />
        <MenuAction
          name="Edit Worker"
          handleAction={() => {
            if (state.table.selected) {
              loadRoute("worker/edit");
            } else {
              dispatch({
                type: "ERROR_DIALOG_SHOW",
                payload: {
                  msg: "Select worker first !",
                  show: true,
                  backTo: "",
                },
              });
            }
          }}
          icon="manage_accounts"
        />
        <MenuAction
          name="Edit Worker Rates"
          handleAction={() => {
            if (state.table.selected) {
              loadRoute("worker/rates");
            } else {
              dispatch({
                type: "ERROR_DIALOG_SHOW",
                payload: {
                  msg: "Select worker first !",
                  show: true,
                  backTo: "",
                },
              });
            }
          }}
          icon="manage_accounts"
        />
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
