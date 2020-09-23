import React, { createContext, useState } from "react";

export const StatusContext = createContext();

export const StatusProvider = (props) => {
  const standardStatuses = [
    "Backlog",
    "Todo",
    "Development",
    "Dev review",
    "Final review",
    "Documentation",
  ];

  const [statuses, setStatuses] = useState(standardStatuses);
  const [statusesAreLoaded, setStatusesAreLoaded] = useState(true);

  return (
    <StatusContext.Provider
      value={{ statuses, setStatuses, statusesAreLoaded, setStatusesAreLoaded }}
    >
      {props.children}
    </StatusContext.Provider>
  );
};
