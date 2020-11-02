import React, { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import StoryLabels from "./StoryLabels";

/**
 * If the selected projects don't have any story a message
 * appears instead of the scrollable div.
 */
function StorySelector() {
  const [projectIds] = useContext(FilterContext);
  let storyLabels = <p>No selected projects</p>;

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
