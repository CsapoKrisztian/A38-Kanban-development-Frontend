import React from 'react';
import Label from './Label';
import useApiCall from '../../hooks/useApiCall';

/**
 * Fetch and render story labels
 */
function StoryLabels({
  projectIds,
  settingsStoryTitles,
  setSettingsStoryTitles,
}) {
  let storyLabels = <p>No stories in the selected projects.</p>;

  const [allStoryTitles, allStoryTitlesAreLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}${process.env['REACT_APP_SERVER_STORIES']}`,
    'POST',
    projectIds
  );

  const addFilter = (storyTitle) => {
    let newStoryTitles = [...settingsStoryTitles, storyTitle];
    setSettingsStoryTitles(newStoryTitles);
    localStorage.setItem('storyTitles', newStoryTitles);
  };

  const deleteFilter = (storyTitle) => {
    let newStoryTitles = [...settingsStoryTitles];
    newStoryTitles.splice(newStoryTitles.indexOf(storyTitle), 1);
    setSettingsStoryTitles(newStoryTitles);
    localStorage.setItem('storyTitles', newStoryTitles);
  };

  if (
    !allStoryTitlesAreLoading &&
    allStoryTitles !== undefined &&
    allStoryTitles !== null &&
    allStoryTitles.length > 0
  ) {
    storyLabels = allStoryTitles.map((storyTitle, index) => (
      <Label
        key={index}
        addFilter={() => {
          addFilter(storyTitle);
        }}
        deleteFilter={() => {
          deleteFilter(storyTitle);
        }}
        title={storyTitle}
        color="#8e44ad"
        settingsStoryTitles={settingsStoryTitles}
      />
    ));
  }

  return storyLabels;
}

export default StoryLabels;
