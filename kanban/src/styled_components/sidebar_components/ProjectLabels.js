import React from "react";
import useApiCall from "../../hooks/useApiCall";
import Label from "./Label";

function ProjectLabels() {
  let projectLabels = "";

  const [projects, projectsAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/projects`,
    "GET"
  );

  if (!projectsAreLoading && projects) {
    projectLabels = projects.map((project, index) => (
      <Label
        key={index}
        projectId={project.id}
        title={
          project.group === null
            ? project.name
            : project.group.name + "/" + project.name
        }
      />
    ));
  }

  return projectLabels;
}

export default ProjectLabels;
