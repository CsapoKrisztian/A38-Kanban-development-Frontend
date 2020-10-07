import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = (props) => {
  const [projectIds, setProjectIds] = useState(new Set());
  return (
    <FilterContext.Provider value={[projectIds, setProjectIds]}>
      {props.children}
    </FilterContext.Provider>
  );
};
