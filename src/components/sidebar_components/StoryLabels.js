import React, { useContext } from "react";
import Label from "./Label";
import useApiCall from "../../hooks/useApiCall";
import { FilterContext } from "../../context/FilterContext";

/**
 * Fetch and render story labels
 */
function StoryLabels(props) {
  let storyLabels = <p>No stories in the selected projects.</p>;

  const [allStoryTitles, allStoryTitlesAreLoading] = useApiCall(
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
    let newStoryTitles = [...allStoryTitles, storyTitle];
    setStoryTitles(newStoryTitles);
    localStorage.setItem("storyTitles", newStoryTitles);
  };

  const deleteFilter = (storyTitle) => {
    let newStoryTitles = allStoryTitles;
    newStoryTitles.splice(newStoryTitles.indexOf(storyTitle), 1);
    setStoryTitles(newStoryTitles);
    localStorage.setItem("storyTitles", newStoryTitles);
  };

  if (
    !allStoryTitlesAreLoading &&
    allStoryTitles !== undefined &&
    allStoryTitles !== null &&
    allStoryTitles.length > 0
  ) {
    storyLabels = allStoryTitles.map((story, index) => (
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
