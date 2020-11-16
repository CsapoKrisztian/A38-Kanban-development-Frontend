import React, { createContext, useState } from 'react';
import getSavedFilters from './getSavedFilters';

// The filter projects ids are stored in this context.
// All of the components have access to them.
// These are applied when the issues are requested from backend.
// These are changed only when the "Get issues" button is clicked.

export const FilterProjectIdsContext = createContext();

export const FilterProjectIdsProvider = (props) => {
  const [projectIds, setProjectIds] = useState(getSavedFilters('projectIds'));

  return (
    <FilterProjectIdsContext.Provider value={[projectIds, setProjectIds]}>
      {props.children}
    </FilterProjectIdsContext.Provider>
  );
};
