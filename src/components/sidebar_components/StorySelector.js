import React from 'react';
import StoryLabels from './StoryLabels';

/**
 * If the selected projects don't have any story a message
 * appears instead of the scrollable div.
 */
function StorySelector({
  settingsProjectIds,
  settingsStoryTitles,
  setSettingsStoryTitles,
}) {
  let storyLabels = <p>No selected projects</p>;

  if (
    settingsProjectIds !== undefined &&
    settingsProjectIds !== null &&
    settingsProjectIds.length > 0
  ) {
    storyLabels = (
      <StoryLabels
        projectIds={settingsProjectIds}
        settingsStoryTitles={settingsStoryTitles}
        setSettingsStoryTitles={setSettingsStoryTitles}
      />
    );
  }

  return storyLabels;
}

export default StorySelector;
