import React from 'react';
import { getTokenUrl } from '../context/Urls';

const Login = () => {
  const login = () => {
    window.location.href = getTokenUrl;
    window.location.href = 'http://localhost:3000';
  };

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
