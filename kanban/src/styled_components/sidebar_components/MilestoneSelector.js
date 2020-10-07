import React, { useContext, useState } from "react";
import { FilterContext } from "../../context/FilterContext";
import MilestoneOptions from "./MilestoneOptions";

function MilestoneSelector() {
  const filterContext = useContext(FilterContext);
  const [selectedProjectIds] = useState(filterContext.projectIds);

  let milestoneOptions = "No selected projects";

  if (filterContext.projectIds) {
    milestoneOptions = <MilestoneOptions projectIds={selectedProjectIds} />;
  }

  return milestoneOptions;
}

export default MilestoneSelector;
