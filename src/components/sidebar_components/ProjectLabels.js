import React from 'react';
import useApiCall from '../../hooks/useApiCall';
import Label from './Label';

/**
 * Fetch and render project labels
 */
const ProjectLabels = ({ settingsProjectIds, setSettingsProjectIds }) => {
  const [projects, projectsAreLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}/projects`,
    'GET'
  );

  const addFilter = (projectId) => {
    const newSettingsProjectIds = [...settingsProjectIds, projectId];
    setSettingsProjectIds(newSettingsProjectIds);
    localStorage.setItem('projectIds', newSettingsProjectIds);
  };

  const deleteFilter = (projectId) => {
    let newSettingsProjectIds = [...settingsProjectIds];
    newSettingsProjectIds.splice(newSettingsProjectIds.indexOf(projectId), 1);
    setSettingsProjectIds(newSettingsProjectIds);
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
        settingsProjectIds={settingsProjectIds}
      />
    ));
  }

  return projectLabels;
};

export default ProjectLabels;
