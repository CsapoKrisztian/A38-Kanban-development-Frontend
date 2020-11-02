import React, { useContext } from "react";
import useApiCall from "../../hooks/useApiCall";
import Label from "./Label";
import { FilterContext } from "../../context/FilterContext";

/**
 * Fetch and render project labels
 */
function ProjectLabels() {
  let projectLabels = "";
  const [projectIds, setProjectIds] = useContext(FilterContext);

  const [projects, projectsAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/projects`,
    "GET"
  );

  const addFilter = (projectId) => {
    let newProjectIds = [...JSON.parse(JSON.stringify(projectIds)), projectId];
    setProjectIds(newProjectIds);
    localStorage.setItem("projectIds", newProjectIds);
  };

  const deleteFilter = (projectId) => {
    let newProjectIds = JSON.parse(JSON.stringify(projectIds));
    newProjectIds.splice(newProjectIds.indexOf(projectId), 1);
    setProjectIds(newProjectIds);
    localStorage.setItem("projectIds", newProjectIds);
  };

  if (
    !projectsAreLoading &&
    projects !== undefined &&
    projects !== null &&
    projects.length > 0
  ) {
    projectLabels = projects.map((project) => (
      <Label
        key={project.id}
        projectId={project.id}
        addFilter={() => {
          addFilter(project.id);
        }}
        deleteFilter={() => {
          deleteFilter(project.id);
        }}
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
