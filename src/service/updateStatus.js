import axios from 'axios';

export const updateStatus = (newStatusTitle, issueId) => {
  axios({
    method: 'POST',
    withCredentials: true,
    url: `${process.env['REACT_APP_SERVER']}${process.env['REACT_APP_SERVER_UPDATE_STATUS']}`,
    data: { issueId, newStatusTitle },
  }).catch((error) => console.log(error));
};
