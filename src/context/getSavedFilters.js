// The locally stored filtered are retreived from local storage using the appropriate key as a parameter.
const getSavedFilters = (localStorageKey) => {
  let filterString = localStorage.getItem(localStorageKey);
  if (
    filterString === null ||
    filterString === '' ||
    filterString === undefined
  ) {
    return [];
  } else {
    return filterString.split(',');
  }
};
export default getSavedFilters;
