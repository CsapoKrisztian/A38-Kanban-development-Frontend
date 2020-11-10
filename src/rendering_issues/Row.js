import React, { useState, useContext } from 'react';
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
export const Row = ({ objectIssues }) => {
  const [statuses] = useContext(StatusContext);

  const [storyIdOfDraggedIssue, setStoryIdOfDraggedIssue] = useState('');

  const [swimlane] = useContext(SwimlaneContext);

  const swimlaneClassName = getAlphaNumeric(
    swimlane === 'STORY'
      ? objectIssues.story !== null && objectIssues.story !== undefined
        ? objectIssues.story.id
        : 'Without story'
      : objectIssues.assignee !== null && objectIssues.assignee !== undefined
      ? objectIssues.assignee.name
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
      issues={objectIssues.issues.filter(
        (issue) => issue.status.title === status
      )}
      status={status}
      swimlaneClassName={swimlaneClassName}
      isDropDisabled={isDropDisabled}
      setStoryIdOfDraggedIssue={setStoryIdOfDraggedIssue}
    />
  ));
};
