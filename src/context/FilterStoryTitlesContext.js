import React, { createContext, useState } from 'react';
import getSavedFilters from './getSavedFilters';

// The filter story titles are stored in this context.
// All of the components have access to them.
// These are applied when the issues are requested from backend.
// These are changed only when the "Get issues" button is clicked.

export const FilterStoryTitlesContext = createContext();

export const FilterStoryTitlesProvider = (props) => {
  const [storyTitles, setStoryTitles] = useState(
    getSavedFilters('storyTitles')
  );

  return (
    <FilterStoryTitlesContext.Provider value={[storyTitles, setStoryTitles]}>
      {props.children}
    </FilterStoryTitlesContext.Provider>
  );
};
