import React, { useContext } from 'react';
import Loading from '../components/reuseables/Loading';
import { TableBody } from './TableBody';

import { StatusContext } from '../context/StatusContext';
import { SwimlaneContext } from '../context/SwimlaneContext';

/**
 * Renders content of tbody
 * @param {*} props
 */
const RenderIssues = ({
  objectIssuesList,
  objectIssuesListIsLoading,
  setObjectIssuesList,
}) => {
  const [statuses] = useContext(StatusContext);
  const [swimlane] = useContext(SwimlaneContext);

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
      console.log('Render Issues after if, objectissueslist:');
      console.log(objectIssuesList);

      return (
        <TableBody
          swimlane={swimlane}
          objectIssuesList={objectIssuesList}
          setObjectIssuesList={setObjectIssuesList}
        />
      );
    }
  }
  return tableBody;
};

export default RenderIssues;
