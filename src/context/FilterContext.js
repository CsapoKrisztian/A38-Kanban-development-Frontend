import React, { createContext, useState } from "react";

/**
 * Selected filters are stored in this context, so all of the
 * components are have access to them
 */
export const FilterContext = createContext();

export const FilterProvider = (props) => {
  const [swimlane, setSwimlane] = useState("ASSIGNEE");

  const getSavedFilters = (localStorageKey) => {
    let filterString = localStorage.getItem(localStorageKey);
    if (filterString === null) {
      return [];
    } else {
      return getSavedFilters.split(',');
    }
  }

  const [projectIds, setProjectIds] = useState(getSavedFilters('projectIds'));
  const [storyTitles, setStoryTitles] = useState(getSavedFilters('storyTitles'));
  const [milestoneTitles, setMilestoneTitles] = useState(getSavedFilters("milestoneTitles"));

  return (
    <FilterContext.Provider
      value={[
        projectIds,
        setProjectIds,
        swimlane,
        setSwimlane,
        milestoneTitles,
        setMilestoneTitles,
        storyTitles,
        setStoryTitles,
      ]}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
