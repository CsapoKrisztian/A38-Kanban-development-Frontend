import React, { createContext, useState } from "react";

/**
 * Selected filters are stored in this context, so all of the
 * components are have access to them
 */
export const FilterContext = createContext();

export const FilterProvider = (props) => {
  const [swimlane, setSwimlane] = useState("ASSIGNEE");
  const [projectIds, setProjectIds] = useState([]);
  const [storyTitles, setStoryTitles] = useState([]);
  const [milestoneTitles, setMilestoneTitles] = useState([]);

  return (
    <FilterContext.Provider
      value={[
        swimlane,
        setSwimlane,
        projectIds,
        setProjectIds,
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
