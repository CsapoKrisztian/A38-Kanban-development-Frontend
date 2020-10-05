import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../context/history';

const useApiCallGET = (url) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('No errors');

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setFetchedData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [url]);

  if (errorMessage !== 'No errors') {
    history.push(`/error/${errorMessage}`);
  }

  return [fetchedData, isLoading];
};

export default useApiCallGET;
