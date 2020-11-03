import React, { createContext, useState } from "react";

/**
 * Selected filters are stored in this context, so all of the
 * components have access to them
 */
export const FilterStoryTitlesContext = createContext();

export const FilterStoryTitlesProvider = (props) => {
  const getSavedFilters = (localStorageKey) => {
    let filterString = localStorage.getItem(localStorageKey);
    if (filterString === null || filterString === '') {
      return [];
    } else {
      return filterString.split(',');
    }
  }

  const [storyTitles, setStoryTitles] = useState(getSavedFilters('storyTitles'));

  return (
    <FilterStoryTitlesContext.Provider value={[storyTitles, setStoryTitles]}>
      {props.children}
    </FilterStoryTitlesContext.Provider>
  );
};
