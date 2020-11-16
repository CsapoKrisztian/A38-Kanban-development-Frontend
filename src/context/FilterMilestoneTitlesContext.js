import React, { createContext, useState } from 'react';
import getSavedFilters from './getSavedFilters';

// The filter milestone titles are stored in this context.
// All of the components have access to them.
// These are applied when the issues are requested from backend.
// These are changed only when the "Get issues" button is clicked.

export const FilterMilestoneTitlesContext = createContext();

export const FilterMilestoneTitlesProvider = (props) => {
  const [milestoneTitles, setMilestoneTitles] = useState(
    getSavedFilters('milestoneTitles')
  );

  return (
    <FilterMilestoneTitlesContext.Provider
      value={[milestoneTitles, setMilestoneTitles]}
    >
      {props.children}
    </FilterMilestoneTitlesContext.Provider>
  );
};
