import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import Row from './Row';
import FirstCellOfRow from './FirstCellOfRow';
import { updateStatus } from '../service/updateStatus';
import { updateAssignee } from '../service/updateAssignee';

const FirstCell = styled.td`
  min-height: 100px !important;
`;

/**
 * The first cell in the row is rendered depending on the swimlane
 * and after that the issues ordered in status columns.
 * Stories shouldn't change, so if the dragged issue's story
 * is different than the destination cell then dropping will be
 * disabled.
 * @see renderRow
 * @param {*} objectIssuesList
 * @param {string[]} statuses
 * @param {string} swimlane
 * @param {string} storyIdOfDraggedIssue
 */
export const TableBody = ({ objectIssuesList, swimlane }) => {
  // Value of storyIdOfDraggedIssue will be the story id of the dragged issue.
  // The story id of the destination cell should be the same, because the story shouldn't change
  const [storyIdOfDraggedIssue, setStoryIdOfDraggedIssue] = useState('');

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
      {objectIssuesList.map((objectIssues, index) => (
        <tr key={index}>
          <FirstCell>
            <div className="mt-4 pt-2 mb-4 pb-2 text-center">
              {FirstCellOfRow(objectIssues, swimlane)}
            </div>
          </FirstCell>

          <Row
            objectIssues={objectIssues}
            storyIdOfDraggedIssue={storyIdOfDraggedIssue}
          />
        </tr>
      ))}
    </DragDropContext>
  );
};
