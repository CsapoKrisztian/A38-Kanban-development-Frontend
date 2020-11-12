import React, { useContext } from 'react';

import Field from './Field';
import { SwimlaneContext } from '../context/SwimlaneContext';

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
const Row = ({ objectId, objectIssues, storyIdOfDraggedIssue }) => {
  const [swimlane] = useContext(SwimlaneContext);

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

  return Object.entries(objectIssues.statusIssuesMap).map(
    ([status, issues]) => {
      return (
        <Field
          key={status}
          issues={issues}
          status={status}
          swimlaneId={objectId}
          isDropDisabled={isDropDisabled}
        />
      );
    }
  );
};

export default Row;
