export const serverUrl = 'http://localhost:8080';

const appId =
  '458f27c6eb357cf7419231331e3af3e3a9d39782b7edf50ac2cc083e7a7f1a4a';
const redir = 'http://localhost:8080/getToken';

export const getTokenUrl = `https://gitlab.techpm.guru/oauth/authorize?client_id=${appId}&redirect_uri=${redir}&response_type=code&scope=api`;
