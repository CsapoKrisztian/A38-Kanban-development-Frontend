import { useState, useEffect } from "react";
import axios from "axios";

const useToken = (getTokenUrl) => {
  const [isToken, setIsToken] = useState(false);
  const [tokenIsLoading, setTokenIsLoading] = useState(false);

  useEffect(() => {
    setTokenIsLoading(true);
    axios.get(getTokenUrl, { withCredentials: true }).then((response) => {
      if (response.data.indexOf("accessToken") !== -1) setIsToken(true);
      setTokenIsLoading(false);
    });
  }, [getTokenUrl]);

  return [isToken, tokenIsLoading];
};

export default useToken;
