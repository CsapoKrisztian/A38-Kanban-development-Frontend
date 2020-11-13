import React from 'react';
import useApiCall from '../../hooks/useApiCall';
import Label from './Label';

/**
 * Fetch and render project labels
 */
const ProjectLabels = ({ selectedProjectIds, setSelectedProjectIds }) => {
  const [projects, projectsAreLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}/projects`,
    'GET'
  );

  const addFilter = (projectId) => {
    const newSettingsProjectIds = [...selectedProjectIds, projectId];
    setSelectedProjectIds(newSettingsProjectIds);
    localStorage.setItem('projectIds', newSettingsProjectIds);
  };

  const deleteFilter = (projectId) => {
    let newSettingsProjectIds = [...selectedProjectIds];
    newSettingsProjectIds.splice(newSettingsProjectIds.indexOf(projectId), 1);
    setSelectedProjectIds(newSettingsProjectIds);
    localStorage.setItem('projectIds', newSettingsProjectIds);
  };

  let projectLabels = '';

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
        selectedProjectIds={selectedProjectIds}
      />
    ));
  }

  return projectLabels;
};

export default ProjectLabels;
