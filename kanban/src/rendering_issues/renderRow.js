import React from "react";
import { getCard } from "./getCard";
import { getAlphaNumeric } from "../util/getAlphaNumeric";
import { Droppable } from "react-beautiful-dnd";

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
export const renderRow = (
  statuses,
  issues,
  swimlaneClassName,
  isDropDisabled
) => {
  return statuses.map((status, index) => (
    <Droppable
      droppableId={`${swimlaneClassName}${getAlphaNumeric(status)}`}
      isDropDisabled={isDropDisabled}
    >
      {(provided) => (
        <td
          id={`${swimlaneClassName}${getAlphaNumeric(status)}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
          key={index}
          className={`col ${swimlaneClassName} ${getAlphaNumeric(status)}`}
        >
          {issues.map((issue, index) => getCard(issue, status, index))}
          {provided.placeholder}
        </td>
      )}
    </Droppable>
  ));
};
