import React, { createContext, useState } from "react";

export const SwimlaneContext = createContext();

export const SwimlaneProvider = (props) => {
  const [swimlane, setSwimlane] = useState("ASSIGNEE");

  return (
    <SwimlaneContext.Provider value={[swimlane, setSwimlane]}>
      {props.children}
    </SwimlaneContext.Provider>
  );
};
