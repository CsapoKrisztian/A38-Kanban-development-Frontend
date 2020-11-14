import React from 'react';
import useApiCall from '../../hooks/useApiCall';
import Label from './Label';

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

  if (
    selectedProjectIds === undefined ||
    selectedProjectIds === null ||
    selectedProjectIds.length === 0
  ) {
    return <p>No selected projects</p>;
  }

  if (
    allStoryTitlesAreLoading ||
    allStoryTitles === undefined ||
    allStoryTitles === null ||
    allStoryTitles.length === 0
  ) {
    return <p>No stories in the selected projects.</p>;
  }

  return allStoryTitles.map((storyTitle, index) => (
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
};

export default StoryLabels;
