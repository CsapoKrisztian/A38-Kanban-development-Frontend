import React, { createContext, useState } from "react";

export const AccessContext = createContext();

export const AccessProvider = (props) => {
  const [gotToken, setGotToken] = useState(false);

  return (
    <AccessContext.Provider value={[gotToken, setGotToken]}>
      {props.children}
    </AccessContext.Provider>
  );
};
