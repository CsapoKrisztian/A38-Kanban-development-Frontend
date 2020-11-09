import React from 'react';
import useApiCall from '../hooks/useApiCall';
import Loading from '../components/reuseables/Loading';
import { ContentOfTable } from './ContentOfTable';

/**
 * Renders content of tbody
 * @param {*} props
 */
function RenderIssues(props) {
  // Get issues ordering by swimlane
  let urlGetIssues =
    props.swimlane === 'STORY'
      ? process.env['REACT_APP_SERVER_ISSUES_BY_STORY']
      : process.env['REACT_APP_SERVER_ISSUES_BY_ASSIGNEE'];

  const [objectIssuesList, objectIssuesListIsLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}${urlGetIssues}`,
    'POST',
    props.projectIds,
    props.milestoneTitles,
    props.storyTitles
  );

  // Showing spinner while loading issues
  let tableBody = <tr></tr>;
  if (objectIssuesListIsLoading)
    tableBody = (
      <tr className="border-0">
        <td className="border-0" colSpan={props.statuses.length + 1}>
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
      (props.swimlane === 'STORY' &&
        objectIssuesList[0].hasOwnProperty('story')) ||
      (props.swimlane === 'ASSIGNEE' &&
        objectIssuesList[0].hasOwnProperty('assignee'))
    ) {
      tableBody = (
        <ContentOfTable
          objectIssuesList={objectIssuesList}
          swimlane={props.swimlane}
        />
      );
    }

    return <React.Fragment>{tableBody}</React.Fragment>;
  }
}

export default RenderIssues;
