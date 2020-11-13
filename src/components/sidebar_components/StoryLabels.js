import React from 'react';
import useApiCall from '../../hooks/useApiCall';
import Label from './Label';

/**
 * If the selected projects don't have any story a message
 * appears instead of the scrollable div.
 */
const StoryLabels = ({
  selectedProjectIds,
  selectedStoryTitles,
  setSelectedStoryTitles,
}) => {
  const [allStoryTitles, allStoryTitlesAreLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}${process.env['REACT_APP_SERVER_STORIES']}`,
    'POST',
    selectedProjectIds
  );

  const addFilter = (storyTitle) => {
    let newStoryTitles = [...selectedStoryTitles, storyTitle];
    setSelectedStoryTitles(newStoryTitles);
    localStorage.setItem('storyTitles', newStoryTitles);
  };

  const deleteFilter = (storyTitle) => {
    let newStoryTitles = [...selectedStoryTitles];
    newStoryTitles.splice(newStoryTitles.indexOf(storyTitle), 1);
    setSelectedStoryTitles(newStoryTitles);
    localStorage.setItem('storyTitles', newStoryTitles);
  };

  let storyLabels = <p>No selected projects</p>;

  if (
    selectedProjectIds !== undefined &&
    selectedProjectIds !== null &&
    selectedProjectIds.length > 0
  ) {
    storyLabels = <p>No stories in the selected projects.</p>;

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
          selectedStoryTitles={selectedStoryTitles}
        />
      ));
    }
  }

  return storyLabels;
};

export default StoryLabels;
