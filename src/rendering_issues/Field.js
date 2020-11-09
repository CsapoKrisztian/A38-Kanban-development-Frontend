import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { getAlphaNumeric } from '../util/getAlphaNumeric';
import { IssueCard } from './IssueCard';
import { updateStatus } from '../service/updateStatus';
import { updateAssignee } from '../service/updateAssignee';

// On the beginning of the drag story is stored in the state

const compareByPriority = (issue1, issue2) => {
  if (issue1.priority === null) return 1;
  if (issue2.priority === null) return -1;
  if (issue1.priority.priorityNum > issue2.priority.priorityNum) return 1;
  if (issue1.priority.priorityNum < issue2.priority.priorityNum) return -1;
  return 0;
};

const Field = ({
  issues,
  status,
  swimlane,
  swimlaneClassName,
  isDropDisabled,
  setStoryIdOfDraggedIssue,
}) => {
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
      <Droppable
        droppableId={`${swimlaneClassName}${getAlphaNumeric(status)}`}
        isDropDisabled={isDropDisabled}
      >
        {(provided) => (
          <td
            id={`${swimlaneClassName}${getAlphaNumeric(status)}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`col ${swimlaneClassName} ${getAlphaNumeric(status)}`}
          >
            {issues
              .sort(compareByPriority)
              .map((issue, index) => IssueCard(issue, index))}
            {provided.placeholder}
          </td>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Field;
