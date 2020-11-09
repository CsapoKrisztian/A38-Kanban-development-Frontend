import React, { createContext, useState } from 'react';

/**
 * If authentication is successful the Gitlab provides a token
 * Thanks to AccessContext, every component knows if the user is authenticated or not
 * @see Learn more about [Context]{@link https://reactjs.org/docs/context.html}
 */
export const AccessContext = createContext();

export const AccessProvider = (props) => {
  /**
   * gotToken: true if authentication was successful
   *  false if it wasn't successful or we didn't got the token yet
   */
  const [gotToken, setGotToken] = useState(false);

  return (
    <AccessContext.Provider value={[gotToken, setGotToken]}>
      {props.children}
    </AccessContext.Provider>
  );
};
