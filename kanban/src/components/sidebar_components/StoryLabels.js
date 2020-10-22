import React, { useContext } from "react";
import Label from "./Label";
import useApiCall from "../../hooks/useApiCall";
import { FilterContext } from "../../context/FilterContext";

/**
 * Fetch and render story labels
 */
function StoryLabels(props) {
  let storyLabels = <p>No stories in the selected projects.</p>;

  const [stories, storiesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}${process.env["REACT_APP_SERVER_STORIES"]}`,
    "POST",
    props.projectIds
  );

  const [
    projectIds,
    setProjectIds,
    swimlane,
    setSwimlane,
    milestoneTitles,
    setMilestoneTitles,
    storyTitles,
    setStoryTitles,
  ] = useContext(FilterContext);

  const addFilter = (storyTitle) => {
    setStoryTitles([...storyTitles, storyTitle]);
  };

  const deleteFilter = (storyTitle) => {
    let newStoryTitles = storyTitles;
    newStoryTitles.splice(newStoryTitles.indexOf(storyTitle), 1);
    setStoryTitles(newStoryTitles);
  };

  if (
    !storiesAreLoading &&
    stories !== undefined &&
    stories !== null &&
    stories.length > 0
  ) {
    storyLabels = stories.map((story, index) => (
      <Label
        key={index}
        addFilter={() => {
          addFilter(story);
        }}
        deleteFilter={() => {
          deleteFilter(story);
        }}
        title={story}
        color="#8e44ad"
      />
    ));
  }

  return storyLabels;
}

export default StoryLabels;
