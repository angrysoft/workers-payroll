import React from "react";
import { WorkerForm } from "./WorkerForm";

const CreateWorkerForm: React.FC = () => {
  return (
    <WorkerForm
      action="/api/v1/user/"
      method="POST"
      requiredFields={[
        "username",
        "email",
        "first_name",
        "last_name",
        "password",
        "password2",
      ]}
    />
  );
};

export { CreateWorkerForm };
