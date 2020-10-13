import React, { useContext } from "react";
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

  let milestoneOptions = <p>No selected projects</p>;

  if (
    projectIds !== undefined &&
    projectIds !== null &&
    projectIds.length != 0
  ) {
    milestoneOptions = <MilestoneOptions projectIds={projectIds} />;
  }

  return milestoneOptions;
}

export default MilestoneSelector;
