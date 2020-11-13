import React, { createContext, useState } from 'react';
import getSavedFilters from './getSavedFilters';

export const FilterProjectIdsContext = createContext();

export const FilterProjectIdsProvider = (props) => {
  const [projectIds, setProjectIds] = useState(getSavedFilters('projectIds'));

  return (
    <FilterProjectIdsContext.Provider value={[projectIds, setProjectIds]}>
      {props.children}
    </FilterProjectIdsContext.Provider>
  );
};
