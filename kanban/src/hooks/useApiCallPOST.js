import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../context/history';

const useApiCall = (url, projectIds, milestoneTitles, storyTitles) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('No errors');

  useEffect(() => {
    setLoading(true);
    axios
      .post(url, {
        projectIds: [
          'gid://gitlab/Project/1',
          'gid://gitlab/Project/2',
          'gid://gitlab/Project/3',
          'gid://gitlab/Project/4',
          'gid://gitlab/Project/5',
          'gid://gitlab/Project/6',
          'gid://gitlab/Project/7',
        ],
        milestoneTitles: [
          'First Milestone',
          'Milestone 4',
          'Third Milestone',
          'Second Milestone',
          'Milestone 1',
          'Milestone 3',
          'Milestone 2',
        ],
        storyTitles: [
          'Story 3',
          'story 1',
          'Documentation',
          'story 2',
          'story 3',
          'Story 2',
          'teszt',
          'Story 1',
        ],
      })
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

export default useApiCall;
