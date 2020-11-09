import React, { useContext } from 'react';
import { FilterProjectIdsContext } from '../../context/FilterProjectIdsContext';
import MilestoneOptions from './MilestoneOptions';

/**
 * If the selected projects don't have any milestone a message
 * appears instead of the dropdown.
 */
function MilestoneSelector() {
  const [filterProjectIds] = useContext(FilterProjectIdsContext);

  let milestoneOptions = <p>No selected projects</p>;

  if (
    filterProjectIds !== undefined &&
    filterProjectIds !== null &&
    filterProjectIds.length !== 0
  ) {
    milestoneOptions = <MilestoneOptions projectIds={filterProjectIds} />;
  }

  return milestoneOptions;
}

export default MilestoneSelector;
