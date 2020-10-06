import { useState, useEffect } from "react";
import axios from "axios";
import history from "../context/history";

const useApiCall = (url, method, projectIds, milestoneTitles, storyTitles) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("No errors");

  useEffect(() => {
    setLoading(true);
    axios({
      method: method,
      withCredentials: true,
      url: url,
      withCredentials: true,
      data: {
        projectIds,
        milestoneTitles,
        storyTitles,
      },
    })
      .then((response) => {
        setFetchedData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [milestoneTitles, projectIds, method, storyTitles, url]);

  if (errorMessage !== "No errors") {
    history.push(`/error/${errorMessage}`);
  }

  return [fetchedData, isLoading];
};

export default useApiCall;
