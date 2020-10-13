import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = (props) => {
  const [swimlane, setSwimlane] = useState("ASSIGNEE");
  const [projectIds, setProjectIds] = useState([]);
  const [storyTitles, setStoryTitles] = useState([]);
  const [milestoneTitles, setMilestoneTitles] = useState([]);
  const [requestIssues, setRequestIssues] = useState(false);

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
        requestIssues,
        setRequestIssues,
      ]}
    >
      {props.children}
    </FilterContext.Provider>
  );
};
