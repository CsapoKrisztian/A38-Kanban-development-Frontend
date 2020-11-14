import React from 'react';
import useApiCall from '../../hooks/useApiCall';
import Label from './Label';

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

  if (
    projectsAreLoading ||
    projects === undefined ||
    projects === null ||
    projects.length === 0
  ) {
    return '';
  }

  return projects.map((project) => (
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
};

export default ProjectLabels;
