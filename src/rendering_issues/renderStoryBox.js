import React from "react";
import Gray from "../components/reuseables/Gray";
import { openTab } from "../util/openTab";
import TextAsButton from "../components/reuseables/TextAsButton";

/**
 * Renders the story name and description in the first cell of a story-row.
 * When the description is a web URL an icon is rendered rather than a
 * text description.
 * @param {*} story
 */
export const renderStoryBox = (story) => {
  let description = "";

  if (story.description !== undefined && story.description !== null) {
    description = story.description;
    if (description.indexOf("http") !== -1) {
      let webUrl = description;
      description = (
        <TextAsButton type="button" onClick={() => openTab(webUrl)}>
          <Gray>
            <i className="fas fa-external-link-square-alt"></i>
          </Gray>
        </TextAsButton>
      );
    }
  }

  return (
    <React.Fragment>
      <h5 className="text-secondary font-weight-bold m-3">{story.title}</h5>
      <span>
        <Gray className="font-weight-light">{description}</Gray>
      </span>
    </React.Fragment>
  );
};
