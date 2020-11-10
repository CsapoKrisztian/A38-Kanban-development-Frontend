import React from 'react';
import useApiCall from '../hooks/useApiCall';
import Loading from '../components/reuseables/Loading';
import { TableBody } from './TableBody';

/**
 * Renders content of tbody
 * @param {*} props
 */
const RenderIssues = ({
  swimlane,
  statuses,
  projectIds,
  milestoneTitles,
  storyTitles,
}) => {
  // Get issues ordering by swimlane
  let urlGetIssues =
    swimlane === 'STORY'
      ? process.env['REACT_APP_SERVER_ISSUES_BY_STORY']
      : process.env['REACT_APP_SERVER_ISSUES_BY_ASSIGNEE'];

  const [objectIssuesList, objectIssuesListIsLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}${urlGetIssues}`,
    'POST',
    projectIds,
    milestoneTitles,
    storyTitles
  );

  // Showing spinner while loading issues
  let tableBody = <tr></tr>;
  if (objectIssuesListIsLoading)
    tableBody = (
      <tr className="border-0">
        <td className="border-0" colSpan={statuses.length + 1}>
          <Loading />
        </td>
      </tr>
    );

  // Render table body after fetching is finished
  // DragDropContext is available only this entity
  if (
    !objectIssuesListIsLoading &&
    objectIssuesList !== undefined &&
    objectIssuesList !== null &&
    objectIssuesList.length > 0
  ) {
    if (
      (swimlane === 'STORY' && objectIssuesList[0].hasOwnProperty('story')) ||
      (swimlane === 'ASSIGNEE' &&
        objectIssuesList[0].hasOwnProperty('assignee'))
    ) {
      tableBody = (
        <TableBody objectIssuesList={objectIssuesList} swimlane={swimlane} />
      );
    }
  }
  return tableBody;
};

export default RenderIssues;
