import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../util/history';

/**
 * Fetches data
 */
const useApiCall = (url, method, projectIds, milestoneTitles, storyTitles) => {
  const [fetchedData, setFetchedData] = useState([]);
  /**
   * isLoading is true while fetches the data
   */
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('No errors');

  console.log('useapi call fetchedData');
  console.log(fetchedData);

  useEffect(() => {
    console.log('useapi call useeffect');

    setLoading(true);
    axios({
      method: method,
      withCredentials: true,
      url: url,
      data: { projectIds, milestoneTitles, storyTitles },
    })
      .then((response) => {
        setFetchedData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, [milestoneTitles, projectIds, method, storyTitles, url]);

  /**
   * Redirects to error page when axios catches an error
   */
  if (errorMessage !== 'No errors') {
    history.push(`/error/${errorMessage}`);
  }

  return [fetchedData, isLoading, setFetchedData];
};

export default useApiCall;
