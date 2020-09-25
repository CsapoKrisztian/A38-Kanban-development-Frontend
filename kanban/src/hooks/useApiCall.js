import { useState, useEffect } from "react";
import axios from "axios";
import history from "../context/history";

const useApiCall = (url, props) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("No errors");

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setFetchedData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  }, [url]);

  console.log(errorMessage);
  if (errorMessage !== "No errors") {
    console.log("jjjj");
    history.push(`/error/${errorMessage}`);
  }

  return [fetchedData, isLoading];
};

export default useApiCall;
