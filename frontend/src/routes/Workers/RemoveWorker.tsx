import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/elements/Button";
import { useApi } from "../../hooks/useApi";
import { AppContext } from "../../store/store";

const RemoveWorker: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const {call, code} = useApi();
  const workerId = state.table.workersTable.selected;
  const handleClickOk = () => {
    call(`/api/v1/user/${workerId}`, {method: "DELETE"});
  };

  useEffect(() => {
    if (code === 200) {
      dispatch({type: "REMOVED_WORKER"});
      navigate("/workers/1", { replace: true });
    }
  }, [code]);

  return (
    <div className="p-2">
      <div className="bg-white grid gap-1 grid-cols-1 p-1 rounded-lg shadow-lg">
        <div className="p-1 border text-red-500 font-bold text-xl">
          Remove Worker account ?
        </div>
        <div className="grid grid-flow-col auto-cols-min gap-1 justify-center">
          <Button handleClick={() => navigate("/workers/1", { replace: true })}>
            Cancel
          </Button>
          <Button handleClick={handleClickOk}>OK</Button>
        </div>
      </div>
    </div>
  );
};

export { RemoveWorker };
