import React, { useContext, useState } from "react";
import { FilterContext } from "../../context/FilterContext";
import StoryLabels from "./StoryLabels";

function StorySelector() {
  const [
    swimlane,
    setSwimlane,
    projectIds,
    setProjectIds,
    milestoneTitles,
    setMilestoneTitles,
    storyTitles,
    setStoryTitles,
  ] = useContext(FilterContext);
  const [selectedProjectIds] = useState(projectIds);

  let storyLabels = "No selected projects";

  if (projectIds !== undefined && projectIds.length != 0) {
    storyLabels = <StoryLabels projectIds={selectedProjectIds} />;
  }

  return storyLabels;
}

export default StorySelector;
