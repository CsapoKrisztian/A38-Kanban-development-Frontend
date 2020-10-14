import React from "react";
import Ribbon from "./Ribbon";

/**
 * Render story if exists in a Ribbon
 * @param {*} story
 */
export const getStoryRibbon = (story) => {
  if (story != null) {
    return (
      <div className="pr-3">
        <Ribbon className="storyRibbon">{story.title}</Ribbon>
      </div>
    );
  }
  return "";
};
