import React, { useContext } from "react";
import Label from "./Label";
import useApiCall from "../../hooks/useApiCall";
import { FilterContext } from "../../context/FilterContext";

function StoryLabels(props) {
  let storyLabels = "No stories in the selected projects.";

  const [stories, storiesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/stories`,
    "POST",
    props.projectIds
  );

  const filterContext = useContext(FilterContext);

  const addFilter = (storyTitle) => {
    let newStoryTitles = new Array(filterContext.storyTitles);
    newStoryTitles.push(storyTitle);
    filterContext.setStoryTitles(newStoryTitles);
  };

  const deleteFilter = (storyTitle) => {
    let newStoryTitles = new Array(filterContext.storyTitles);
    newStoryTitles.splice(newStoryTitles.indexOf(storyTitle), 1);
    filterContext.setStoryTitles(newStoryTitles);
  };

  if (!storiesAreLoading && stories) {
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
        color="#34495E"
      />
    ));
  }

  return storyLabels;
}

export default StoryLabels;
