import React, { useContext } from 'react';
import { AccessContext } from '../context/AccessContext';
import Loading from '../components/reuseables/Loading';
import Main from '../layout/Main';

/**
 * If user is authenticated renders Main component
 * else redirects to Gitlab server to get code parameter
 * which is required for requesting access token
 */
const AuthController = () => {
  const [gotToken] = useContext(AccessContext);

  /**
   * Gitlab will redirect to /getToken Route
   */
  const redirectUri = `${process.env['REACT_APP_APPLICATION']}${process.env['REACT_APP_TOKEN']}`;
  const getAuthorizationCodeUrl = `${process.env['REACT_APP_GITLAB_SERVER']}/oauth/authorize?client_id=${process.env['REACT_APP_GITLAB_APP_ID']}&redirect_uri=${redirectUri}&response_type=code&scope=api`;

  let content = <Loading />;

  if (gotToken) {
    content = <Main />;
  } else {
    window.location = getAuthorizationCodeUrl;
  }

  return content;
};

export default AuthController;
