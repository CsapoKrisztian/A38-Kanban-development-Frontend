import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../context/history';

const useApiCall = (url, projectIds, milestoneTitles, storyTitles) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('No errors');

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'post',
      url: url,
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
  }, [milestoneTitles, projectIds, storyTitles, url]);

  if (errorMessage !== 'No errors') {
    history.push(`/error/${errorMessage}`);
  }

  return [fetchedData, isLoading];
};

export default useApiCall;
