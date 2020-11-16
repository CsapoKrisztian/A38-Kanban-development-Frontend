import React from 'react';
import useApiCall from '../../hooks/useApiCall';
import Label from './Label';

const ProjectLabels = ({ selectedProjectIds, setSelectedProjectIds }) => {
  const [projects, projectsAreLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}/projects`,
    'GET'
  );

  const addFilter = (projectId) => {
    const newSelectedProjectIds = [...selectedProjectIds, projectId];
    setSelectedProjectIds(newSelectedProjectIds);
    localStorage.setItem('projectIds', newSelectedProjectIds);
  };

  const deleteFilter = (projectId) => {
    let newSelectedProjectIds = [...selectedProjectIds];
    newSelectedProjectIds.splice(newSelectedProjectIds.indexOf(projectId), 1);
    setSelectedProjectIds(newSelectedProjectIds);
    localStorage.setItem('projectIds', newSelectedProjectIds);
  };

  // If there are no project ids that can be displayed, then an empty string is returned.
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
