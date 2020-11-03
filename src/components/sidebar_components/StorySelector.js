import React, { useContext } from "react";
import { FilterProjectIdsContext } from "../../context/FilterProjectIdsContext";
import StoryLabels from "./StoryLabels";

/**
 * If the selected projects don't have any story a message
 * appears instead of the scrollable div.
 */
function StorySelector() {
  const [filterProjectIds] = useContext(FilterProjectIdsContext);
  let storyLabels = <p>No selected projects</p>;

  if (
    filterProjectIds !== undefined &&
    filterProjectIds !== null &&
    filterProjectIds.length > 0
  ) {
    storyLabels = <StoryLabels projectIds={filterProjectIds} />;
  }

  return storyLabels;
}

export default StorySelector;
