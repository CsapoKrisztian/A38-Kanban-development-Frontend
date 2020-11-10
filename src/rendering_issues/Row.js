import React, { useState, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Field from './Field';
import { StatusContext } from '../context/StatusContext';
import { SwimlaneContext } from '../context/SwimlaneContext';
import { getAlphaNumeric } from '../util/getAlphaNumeric';
import { updateStatus } from '../service/updateStatus';
import { updateAssignee } from '../service/updateAssignee';

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
  const [swimlane] = useContext(SwimlaneContext);
  const [statuses] = useContext(StatusContext);

  const [storyIdOfDraggedIssue, setStoryIdOfDraggedIssue] = useState('');

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

  const handleOnDragStart = (start) => {
    let card = document.getElementById(start.draggableId);
    let ribbon = card.querySelector('.storyRibbon');
    if (ribbon !== undefined && ribbon !== null) {
      setStoryIdOfDraggedIssue(ribbon.id);
    }
  };

  // Validation of dragging and finalization of dropping
  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let sourceCell = document.getElementById(source.droppableId);
    let destinationCell = document.getElementById(destination.droppableId);
    let card = document.getElementById(draggableId);

    // Append destination cell with the dragged issue card
    destinationCell.appendChild(card);
    updateStatus(sourceCell, destinationCell, draggableId);
    if (swimlane === 'ASSIGNEE') {
      updateAssignee(sourceCell, destinationCell, draggableId);
    }

    // Remove story of the dragged issue from the state
    setStoryIdOfDraggedIssue(null);
  };

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={handleOnDragStart}
    >
      {statuses.map((status) => (
        <Field
          key={status}
          issues={objectIssues.issues.filter(
            (issue) => issue.status.title === status
          )}
          status={status}
          swimlaneClassName={swimlaneClassName}
          isDropDisabled={isDropDisabled}
        />
      ))}
    </DragDropContext>
  );
};
