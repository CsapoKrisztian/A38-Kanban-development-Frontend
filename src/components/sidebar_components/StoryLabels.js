import React, { useContext } from 'react';
import Label from './Label';
import useApiCall from '../../hooks/useApiCall';
import { FilterStoryTitlesContext } from '../../context/FilterStoryTitlesContext';

/**
 * Fetch and render story labels
 */
function StoryLabels({ projectIds }) {
  let storyLabels = <p>No stories in the selected projects.</p>;

  const [allStoryTitles, allStoryTitlesAreLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}${process.env['REACT_APP_SERVER_STORIES']}`,
    'POST',
    projectIds
  );

  const [filterStoryTitles, setFilterStoryTitles] = useContext(
    FilterStoryTitlesContext
  );

  const addFilter = (storyTitle) => {
    let newStoryTitles = [...filterStoryTitles, storyTitle];
    setFilterStoryTitles(newStoryTitles);
    localStorage.setItem('storyTitles', newStoryTitles);
  };

  const deleteFilter = (storyTitle) => {
    let newStoryTitles = [...filterStoryTitles];
    newStoryTitles.splice(newStoryTitles.indexOf(storyTitle), 1);
    setFilterStoryTitles(newStoryTitles);
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
      />
    ));
  }

  return storyLabels;
}

export default StoryLabels;
