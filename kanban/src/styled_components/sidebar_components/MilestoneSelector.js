import React, { useContext, useState } from "react";
import { FilterContext } from "../../context/FilterContext";
import MilestoneOptions from "./MilestoneOptions";

function MilestoneSelector() {
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

  let milestoneOptions = "No selected projects";

  if (projectIds !== undefined && projectIds.length != 0) {
    milestoneOptions = <MilestoneOptions projectIds={selectedProjectIds} />;
  }

  return milestoneOptions;
}

export default MilestoneSelector;
