import React, { createContext } from 'react';
import useApiCall from '../hooks/useApiCall';

export const StatusContext = createContext();

export const StatusProvider = (props) => {
  const [statuses, statusesAreLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}${process.env['REACT_APP_SERVER_STATUSES']}`,
    'GET'
  );

  return (
    <StatusContext.Provider value={[statuses, statusesAreLoading]}>
      {props.children}
    </StatusContext.Provider>
  );
};
