import React, { useContext } from "react";
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
  let storyLabels = <p>"No selected projects"</p>;

  if (
    projectIds !== undefined &&
    projectIds !== null &&
    projectIds.length > 0
  ) {
    storyLabels = <StoryLabels projectIds={projectIds} />;
  }

  return storyLabels;
}

export default StorySelector;
