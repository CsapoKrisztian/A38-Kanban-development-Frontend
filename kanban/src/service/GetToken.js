import React from 'react';
import axios from 'axios';

import { serverUrl } from '../context/Urls';
import { Redirect } from 'react-router-dom';

const GetToken = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let code = params.get('code');

  const getTokenUrl = `${serverUrl}/getToken?code=${code}`;

  axios.get(getTokenUrl).then((response) => {
    console.log(response.data);
  });

  return <Redirect to="/" />;
};

export default GetToken;
