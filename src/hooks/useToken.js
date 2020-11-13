import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Acquires access token from the server
 * Server sets the cookie to the browser
 * @param {string} getTokenUrl
 */
const useToken = (getTokenUrl) => {
  const [isToken, setIsToken] = useState(false);
  const [tokenIsLoading, setTokenIsLoading] = useState(false);

  useEffect(() => {
    setTokenIsLoading(true);
    axios
      .post(
        getTokenUrl,
        {
          appId: `${process.env['REACT_APP_GITLAB_APP_ID']}`,
          appSecret: `${process.env['REACT_APP_GITLAB_APP_SECRET']}`,
          redirectUri: `${process.env['REACT_APP_APPLICATION']}${process.env['REACT_APP_SERVER_TOKEN']}`,
        },
        { withCredentials: true }
      )
      .then((response) => {
        /**
         * Set isToken true if authentication was successful
         */
        if (response.data.indexOf('accessToken') !== -1) setIsToken(true);
        setTokenIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [getTokenUrl]);

  return [isToken, tokenIsLoading];
};

export default useToken;
