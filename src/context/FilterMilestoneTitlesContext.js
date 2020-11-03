import React, { createContext, useState } from "react";
import getSavedFilters from "./getSavedFilters";

/**
 * Selected filters are stored in this context, so all of the
 * components have access to them
 */
export const FilterMilestoneTitlesContext = createContext();

export const FilterMilestoneTitlesProvider = (props) => {
  const [milestoneTitles, setMilestoneTitles] = useState(getSavedFilters("milestoneTitles"));

  return (
    <FilterMilestoneTitlesContext.Provider value={[milestoneTitles,setMilestoneTitles,]}>
      {props.children}
    </FilterMilestoneTitlesContext.Provider>
  );
};
