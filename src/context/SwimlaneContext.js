import React, { createContext, useState } from 'react';

// The swimlane is stored in this context.
// All of the components have access to this.
// This is applied when the issues are requested from backend.
// This is changed only when the "Get issues" button is clicked.

export const SwimlaneContext = createContext();

export const SwimlaneProvider = (props) => {
  const getSavedSwimlane = () => {
    return localStorage.getItem('swimlane') === 'STORY' ? 'STORY' : 'ASSIGNEE';
  };

  const [swimlane, setSwimlane] = useState(getSavedSwimlane);

  return (
    <SwimlaneContext.Provider value={[swimlane, setSwimlane]}>
      {props.children}
    </SwimlaneContext.Provider>
  );
};
