import React from "react";
import Label from "./Label";
import useApiCall from "../../hooks/useApiCall";

function StoryLabels(props) {
  let storyLabels = "";

  /*  const [stories, storiesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/stories`,
    "POST",
    props.projectIds
  );

  if (!storiesAreLoading && stories) {
    storyLabels = stories.map((story, index) => (
      <Label key={index} title={story} color="#34495E" />
    ));
  }*/

  // Remove from here until return
  const storyTitles = [
    "Story 3",
    "story 1",
    "Documentation",
    "story 2",
    "story 3",
    "Story 2",
    "teszt",
    "Story 1",
  ];

  storyLabels = storyTitles.map((story, index) => (
    <Label key={index} title={story} color="#8e44ad" />
  ));

  return storyLabels;
}

export default StoryLabels;
