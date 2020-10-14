import { useState, useEffect } from "react";
import axios from "axios";

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
    axios.get(getTokenUrl, { withCredentials: true }).then((response) => {
      /**
       * Set isToken true if authentication was successful
       */
      if (response.data.indexOf("accessToken") !== -1) setIsToken(true);
      setTokenIsLoading(false);
    });
  }, [getTokenUrl]);

  return [isToken, tokenIsLoading];
};

export default useToken;
