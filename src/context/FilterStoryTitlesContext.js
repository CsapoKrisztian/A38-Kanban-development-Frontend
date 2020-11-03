import React, { createContext, useState } from "react";
import getSavedFilters from "./getSavedFilters";

/**
 * Selected filters are stored in this context, so all of the
 * components have access to them
 */
export const FilterStoryTitlesContext = createContext();

export const FilterStoryTitlesProvider = (props) => {
  const [storyTitles, setStoryTitles] = useState(getSavedFilters('storyTitles'));

  return (
    <FilterStoryTitlesContext.Provider value={[storyTitles, setStoryTitles]}>
      {props.children}
    </FilterStoryTitlesContext.Provider>
  );
};
