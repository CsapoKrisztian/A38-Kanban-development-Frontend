export const serverUrl = 'http://localhost:8080';

const appId =
  '458f27c6eb357cf7419231331e3af3e3a9d39782b7edf50ac2cc083e7a7f1a4a';
const redirectUri = 'http://localhost:3000/getToken';

export const getAuthorizationCodeUrl = `https://gitlab.techpm.guru/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=api`;
