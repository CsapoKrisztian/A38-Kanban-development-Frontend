import React, { createContext, useState } from "react";

export const LabelContext = createContext();

export const LabelProvider = (props) => {
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
    <LabelContext.Provider
      value={{ statuses, setStatuses, statusesAreLoaded, setStatusesAreLoaded }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};
