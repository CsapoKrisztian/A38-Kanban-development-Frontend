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
export const TableBody = ({
  swimlane,
  objectIssuesMap,
  setObjectIssuesMap,
}) => {
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

    const sourceField = document.getElementById(source.droppableId);

    const sourceStatus = sourceField.getAttribute('status');
    const sourceSwimlaneId = sourceField.getAttribute('swimlaneid');

    const sourceSwimlaneIssues = objectIssuesMap[sourceSwimlaneId];
    const sourceFieldIssues =
      sourceSwimlaneIssues.statusIssuesMap[sourceStatus];
    const [removed] = sourceFieldIssues.splice(source.index, 1);

    const destinationField = document.getElementById(destination.droppableId);

    const destinationStatus = destinationField.getAttribute('status');
    const destinationSwimlaneId = destinationField.getAttribute('swimlaneid');

    const destinationSwimlaneIssues = objectIssuesMap[destinationSwimlaneId];
    const destinationFieldIssues =
      destinationSwimlaneIssues.statusIssuesMap[destinationStatus];
    destinationFieldIssues.splice(destination.index, 0, removed);

    setObjectIssuesMap({
      ...objectIssuesMap,
    });

    // Append destination cell with the dragged issue card
    // destinationField.appendChild(issueCard);

    // updateStatus(sourceField, destinationField, draggableId);
    // if (swimlane === 'ASSIGNEE') {
    //   updateAssignee(sourceField, destinationField, draggableId);
    // }

    // Remove story of the dragged issue from the state
    // setStoryIdOfDraggedIssue(null);
  };

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={handleOnDragStart}
    >
      {Object.entries(objectIssuesMap).map(([objectId, objectIssues]) => {
        return (
          <tr key={objectId}>
            <FirstCell>
              <div className="mt-4 pt-2 mb-4 pb-2 text-center">
                {FirstCellOfRow(objectIssues, swimlane)}
              </div>
            </FirstCell>

            <Row
              objectId={objectId}
              objectIssues={objectIssues}
              storyIdOfDraggedIssue={storyIdOfDraggedIssue}
            />
          </tr>
        );
      })}
    </DragDropContext>
  );
};

// [sourceSwimlaneId]: {
//   ...sourceSwimlaneIssues,
//   statusIssuesMap: {
//     ...sourceSwimlaneIssues.statusIssuesMap,
//     [sourceStatus]: [...sourceFieldIssues],
//   },
// },
