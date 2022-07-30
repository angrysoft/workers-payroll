import React from "react";
import { EventForm } from "./EventForm";

const AddEvent: React.FC = () => {
  return (
    <EventForm
      action="/api/v1/event/"
      method="POST"
      requiredFields={["name", "number", "coordinator", "account_manager"]}
      header="Add new event"
    />
  );
};

export { AddEvent };
