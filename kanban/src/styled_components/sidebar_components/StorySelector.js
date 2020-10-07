import React, { useContext, useState } from "react";
import { FilterContext } from "../../context/FilterContext";
import StoryLabels from "./StoryLabels";

function StorySelector() {
  const filterContext = useContext(FilterContext);
  const [selectedProjectIds] = useState(filterContext.projectIds);

  let storyLabels = "No selected projects";

  if (filterContext.projectIds) {
    storyLabels = <StoryLabels projectIds={selectedProjectIds} />;
  }

  return storyLabels;
}

export default StorySelector;
