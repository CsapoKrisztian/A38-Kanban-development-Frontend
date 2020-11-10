import React, { useContext } from 'react';

import Field from './Field';
import { StatusContext } from '../context/StatusContext';
import { SwimlaneContext } from '../context/SwimlaneContext';
import { getAlphaNumeric } from '../util/getAlphaNumeric';

/**
 * Each cell in a row is Droppable, except the first one (story/assignee)
 * Droppable is an entity where a Draggable (in this case an issue card)
 * can be placed by Drag&Drop.
 * Id-s and classnames are formed by the alphanumeric names of rows (swimlane)
 * and columns (status)
 * @param {string[]} statuses
 * @param {*} objectIssues
 * @param {string} swimlaneClassName
 * @param {boolean} isDropDisabled
 */
const Row = ({ objectIssues, storyIdOfDraggedIssue }) => {
  const [swimlane] = useContext(SwimlaneContext);
  const [statuses] = useContext(StatusContext);

  const swimlaneId = getAlphaNumeric(
    swimlane === 'STORY'
      ? objectIssues.story !== null && objectIssues.story !== undefined
        ? objectIssues.story.id
        : 'Without story'
      : objectIssues.assignee !== null && objectIssues.assignee !== undefined
      ? objectIssues.assignee.id
      : 'Unassigned'
  );

  const isDropDisabled =
    swimlane === 'STORY'
      ? objectIssues.story !== null && objectIssues.story !== undefined
        ? storyIdOfDraggedIssue !== objectIssues.story.id
          ? true
          : false
        : storyIdOfDraggedIssue !== ''
        ? true
        : false
      : false;

  return statuses.map((status) => (
    <Field
      key={status}
      issuesFilteredByStatus={objectIssues.issues.filter(
        (issue) => issue.status.title === status
      )}
      status={status}
      swimlaneId={swimlaneId}
      isDropDisabled={isDropDisabled}
    />
  ));
};

export default Row;
