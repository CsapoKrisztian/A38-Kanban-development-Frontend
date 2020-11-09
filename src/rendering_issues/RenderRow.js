import React from 'react';
import RenderField from './RenderField';

/**
 * Each cell in a row is Droppable, except the first one (story/assignee)
 * Droppable is an entity where a Draggable (in this case an issue card)
 * can be placed by Drag&Drop.
 * Id-s and classnames are formed by the alphanumeric names of rows (swimlane)
 * and columns (status)
 * @param {string[]} statuses
 * @param {*} issues
 * @param {string} swimlaneClassName
 * @param {boolean} isDropDisabled
 */
export const RenderRow = (
  statuses,
  issues,
  swimlaneClassName,
  isDropDisabled
) => {
  return statuses.map((status) => (
    <RenderField
      key={status}
      issues={issues.filter((issue) => issue.status.title === status)}
      status={status}
      swimlaneClassName={swimlaneClassName}
      isDropDisabled={isDropDisabled}
    />
  ));
};
