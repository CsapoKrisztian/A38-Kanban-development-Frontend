import React, { useContext, useState } from "react";
import { FilterContext } from "../../context/FilterContext";
import StoryLabels from "./StoryLabels";

function StorySelector() {
  const [projectIds] = useContext(FilterContext);
  const [selectedProjectIds] = useState(projectIds);

  let storyLabels = "";

  //if (projectIds.size > 0) {
  storyLabels = <StoryLabels projectIds={selectedProjectIds} />;
  //}

  return storyLabels;
}

export default StorySelector;
