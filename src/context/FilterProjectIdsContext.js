import React, { createContext, useState } from "react";

export const FilterProjectIdsContext = createContext();

export const FilterProjectIdsProvider = (props) => {

  const getSavedFilters = (localStorageKey) => {
    let filterString = localStorage.getItem(localStorageKey);
    if (filterString === null || filterString === '') {
      return [];
    } else {
      return filterString.split(',');
    }
  }

  const [projectIds, setProjectIds] = useState(getSavedFilters('projectIds'));

  return (
    <FilterProjectIdsContext.Provider value={[projectIds, setProjectIds]}>
      {props.children}
    </FilterProjectIdsContext.Provider>
  );
};
