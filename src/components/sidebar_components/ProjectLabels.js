import React, { useContext } from 'react';
import useApiCall from '../../hooks/useApiCall';
import Label from './Label';
import { FilterProjectIdsContext } from '../../context/FilterProjectIdsContext';

/**
 * Fetch and render project labels
 */
function ProjectLabels() {
  let projectLabels = '';
  const [filterProjectIds, setFilterProjectIds] = useContext(
    FilterProjectIdsContext
  );

  const [projects, projectsAreLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}/projects`,
    'GET'
  );

  const addFilter = (projectId) => {
    let newFilterProjectIds = [...filterProjectIds, projectId];
    setFilterProjectIds(newFilterProjectIds);
    localStorage.setItem('projectIds', newFilterProjectIds);
  };

  const deleteFilter = (projectId) => {
    let newFilterProjectIds = [...filterProjectIds];
    newFilterProjectIds.splice(newFilterProjectIds.indexOf(projectId), 1);
    setFilterProjectIds(newFilterProjectIds);
    localStorage.setItem('projectIds', newFilterProjectIds);
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
            : project.group.name + '/' + project.name
        }
      />
    ));
  }

  return projectLabels;
}

export default ProjectLabels;
