export const getLastPartAfterSlash = (str) => {
  let i = str.length - 1;
  while (str.charAt(i - 1) !== "/") {
    i--;
  }
  return str.substring(i, str.length);
};

export const openTab = (webUrl) => {
  window.open(webUrl);
};
