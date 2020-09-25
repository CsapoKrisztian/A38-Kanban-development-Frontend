import React, { createContext } from "react";
import useApiCall from "../hooks/useApiCall";
import serverUrl from "../context/ServerUrl";

export const LabelContext = createContext();

export const LabelProvider = (props) => {
  const defaultStatuses = [
    "Backlog",
    "Todo",
    "Development",
    "Dev review",
    "Final review",
    "Documentation",
  ];

  const [statuses, statusesAreLoading] = useApiCall(`${serverUrl}/statuses`);

  return (
    <LabelContext.Provider
      value={{ defaultStatuses, statuses, statusesAreLoading }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};
