import React from 'react';
import Loading from '../styled_components/Loading';
import KanbanTable from '../layout/KanbanTable';
import Filters from '../styled_components/Filters';
import useApiCallGET from '../hooks/useApiCallGET';
import useApiCallPOST from '../hooks/useApiCallPOST';

function Main() {
  let projectIds = [
    'gid://gitlab/Project/1',
    'gid://gitlab/Project/2',
    'gid://gitlab/Project/3',
    'gid://gitlab/Project/4',
    'gid://gitlab/Project/5',
    'gid://gitlab/Project/6',
    'gid://gitlab/Project/7',
  ];
  let milestoneTitles = [
    'First Milestone',
    'Milestone 4',
    'Third Milestone',
    'Second Milestone',
    'Milestone 1',
    'Milestone 3',
    'Milestone 2',
  ];
  let storyTitles = [
    'Story 3',
    'story 1',
    'Documentation',
    'story 2',
    'story 3',
    'Story 2',
    'teszt',
    'Story 1',
  ];

  let content = <Loading />;
  const [statuses, statusesAreLoading] = useApiCallGET(
    `${process.env['REACT_APP_SERVER']}/statuses`
  );
  const [issuesByStory, issuesByStoryAreLoading] = useApiCallPOST(
    `${process.env['REACT_APP_SERVER']}/issues/orderByStory`
  );

  let projects = ['Project1', 'Project2', 'Project6'];
  let milestone = ['X'];

  if (
    !statusesAreLoading &&
    statuses &&
    !issuesByStoryAreLoading &&
    issuesByStory
  ) {
    console.log(issuesByStory);
    content = (
      <React.Fragment>
        <Filters projects={projects} milestone={milestone}></Filters>
        <KanbanTable statuses={statuses} issues={issuesByStory} />
      </React.Fragment>
    );
  }

  return content;
}

export default Main;
