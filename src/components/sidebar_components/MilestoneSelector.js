import React from 'react';
import MilestoneOptions from './MilestoneOptions';

/**
 * If the selected projects don't have any milestone a message
 * appears instead of the dropdown.
 */
function MilestoneSelector({ settingsProjectIds, setSettingsMilestoneTitles }) {
  let milestoneOptions = <p>No selected projects</p>;

  if (
    settingsProjectIds !== undefined &&
    settingsProjectIds !== null &&
    settingsProjectIds.length !== 0
  ) {
    milestoneOptions = (
      <MilestoneOptions
        settingsProjectIds={settingsProjectIds}
        setSettingsMilestoneTitles={setSettingsMilestoneTitles}
      />
    );
  }

  return milestoneOptions;
}

export default MilestoneSelector;
