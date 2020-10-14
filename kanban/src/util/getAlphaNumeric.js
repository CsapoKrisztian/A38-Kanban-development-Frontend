/**
 * Removes all characters from the string which are not alphanumeric
 * @param {string} str
 */
export const getAlphaNumeric = (str) => {
  if (str === "" || str === undefined) return "";
  return str.replace(/[\W_]+/g, "");
};
