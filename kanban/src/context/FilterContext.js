import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = (props) => {
  const [swimlane, setSwimlane] = useState("STORY");
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
