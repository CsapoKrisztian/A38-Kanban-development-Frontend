import React, { useContext } from "react";
import useApiCall from "../../hooks/useApiCall";
import Label from "./Label";
import { FilterContext } from "../../context/FilterContext";

function ProjectLabels() {
  let projectLabels = "";
  const [
    swimlane,
    setSwimlane,
    projectIds,
    setProjectIds,
    milestoneTitles,
    setMilestoneTitles,
    storyTitles,
    setStoryTitles,
  ] = useContext(FilterContext);

  const [projects, projectsAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/projects`,
    "GET"
  );

  const addFilter = (projectId) => {
    let newProjectIds = projectIds;
    newProjectIds.push(projectId);
    setProjectIds(new Array(newProjectIds));
    console.log(projectIds);
  };

  const deleteFilter = (projectId) => {
    let newProjectIds = projectIds;
    newProjectIds.splice(newProjectIds.indexOf(projectId), 1);
    setProjectIds(new Array(newProjectIds));
    console.log(projectIds);
  };

  if (!projectsAreLoading && projects) {
    projectLabels = projects.map((project, index) => (
      <Label
        key={index}
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
