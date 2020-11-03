import React from "react";
import Information from "./Information";

/**
 * Expandable div for other labels like project or reference
 * @param {*} project
 * @param {*} reference
 */
export const getOtherLabelsBox = (project, reference) => {
  let projectName = project != null ? project.name : "";
  reference = reference != null ? reference : "";
  if (projectName !== "" || reference !== "") {
    return (
      <Information>
        <span className="projectname" data-project-id={project.id}>
          {projectName}
        </span>{" "}
        {reference}
      </Information>
    );
  }
  return "";
};
