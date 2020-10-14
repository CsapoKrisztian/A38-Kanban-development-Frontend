import React from "react";
import TextAsButton from "../reuseables/TextAsButton";
import Gray from "../reuseables/Gray";
import { openTab } from "../../util/openTab";

/**
 * Clicking on the Gitlab logo opens a new tab with the corresponding issue
 * @param {*} webUrl
 */
export const getGitlabLogoBox = (webUrl) => {
  webUrl = webUrl != null ? webUrl : "/";

  return (
    <div className="col text-center d-flex align-items-center justify-content-center">
      <TextAsButton onClick={() => openTab(webUrl)}>
        <Gray>
          <i className="fab fa-gitlab"></i>
        </Gray>
      </TextAsButton>
    </div>
  );
};
