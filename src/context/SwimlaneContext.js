import React, { createContext, useState } from "react";

export const SwimlaneContext = createContext();

export const SwimlaneProvider = (props) => {
  const getSavedSwimlane = () => {
    return localStorage.getItem('swimlane') === "STORY" ? 'STORY' : 'ASSIGNEE';
}

  const [swimlane, setSwimlane] = useState(getSavedSwimlane);

  return (
    <SwimlaneContext.Provider value={[swimlane, setSwimlane]}>
      {props.children}
    </SwimlaneContext.Provider>
  );
};
