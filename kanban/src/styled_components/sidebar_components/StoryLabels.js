import React, { useContext } from "react";
import Label from "./Label";
import useApiCall from "../../hooks/useApiCall";
import { FilterContext } from "../../context/FilterContext";

function StoryLabels(props) {
  let storyLabels = "";

  const [stories, storiesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/stories`,
    "POST",
    props.projectIds
  );

  const [storyTitles, setStoryTitles] = useContext(FilterContext);

  const addFilter = (storyTitle) => {
    let newStoryTitles = new Array(storyTitles);
    newStoryTitles.push(storyTitle);
    setStoryTitles(newStoryTitles);
  };

  const deleteFilter = (storyTitle) => {
    let newStoryTitles = new Array(storyTitles);
    newStoryTitles.push(storyTitle);
    setStoryTitles(newStoryTitles);
  };

  if (!storiesAreLoading && stories) {
    storyLabels = stories.map((story, index) => (
      <Label
        key={index}
        setFilter={() => addFilter(story)}
        deleteFilter={() => deleteFilter(story)}
        title={story}
        color="#34495E"
      />
    ));
  }

  return storyLabels;
}

export default StoryLabels;
