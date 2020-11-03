import React, { createContext, useState } from "react";

/**
 * Selected filters are stored in this context, so all of the
 * components have access to them
 */
export const FilterMilestoneTitlesContext = createContext();

export const FilterMilestoneTitlesProvider = (props) => {
  const getSavedFilters = (localStorageKey) => {
    let filterString = localStorage.getItem(localStorageKey);
    if (filterString === null || filterString === '') {
      return [];
    } else {
      return filterString.split(',');
    }
  }

  const [milestoneTitles, setMilestoneTitles] = useState(getSavedFilters("milestoneTitles"));

  return (
    <FilterMilestoneTitlesContext.Provider value={[milestoneTitles,setMilestoneTitles,]}>
      {props.children}
    </FilterMilestoneTitlesContext.Provider>
  );
};
