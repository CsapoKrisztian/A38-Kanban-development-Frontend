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
