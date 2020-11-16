import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

import Row from './Row';
import FirstCellOfRow from './FirstCellOfRow';

const FirstCell = styled.td`
  min-height: 100px !important;
`;

const updateStatusOnBackend = (newStatusTitle, issueId) => {
  axios({
    method: 'POST',
    withCredentials: true,
    url: `${process.env['REACT_APP_SERVER']}${process.env['REACT_APP_SERVER_UPDATE_STATUS']}`,
    data: { issueId, newStatusTitle },
  }).catch((error) => console.log(error));
};

const updateAssigneeOnBackend = (newAssigneeId, issueId) => {
  axios({
    method: 'POST',
    withCredentials: true,
    url: `${process.env['REACT_APP_SERVER']}${process.env['REACT_APP_SERVER_UPDATE_ASSIGNEE']}`,
    data: { issueId, newAssigneeId },
  }).catch((error) => console.log(error));
};

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
    if (destination.droppableId === source.droppableId) {
      return;
    }

    // Collect necessary data
    const sourceField = document.getElementById(source.droppableId);
    const sourceStatus = sourceField.getAttribute('status');
    const sourceSwimlaneId = sourceField.getAttribute('swimlaneid');

    const destinationField = document.getElementById(destination.droppableId);
    const destinationStatus = destinationField.getAttribute('status');
    const destinationSwimlaneId = destinationField.getAttribute('swimlaneid');

    // Update issues on frontend
    const sourceSwimlaneIssues = objectIssuesMap[sourceSwimlaneId];
    const sourceFieldIssues =
      sourceSwimlaneIssues.statusIssuesMap[sourceStatus];
    const [removed] = sourceFieldIssues.splice(source.index, 1);

    const destinationSwimlaneIssues = objectIssuesMap[destinationSwimlaneId];
    const destinationFieldIssues =
      destinationSwimlaneIssues.statusIssuesMap[destinationStatus];
    destinationFieldIssues.splice(destination.index, 0, removed);

    setObjectIssuesMap({
      ...objectIssuesMap,
    });

    // Update issues on backend
    if (sourceStatus !== destinationStatus) {
      updateStatusOnBackend(destinationStatus, draggableId);
    }
    if (swimlane === 'ASSIGNEE' && sourceSwimlaneId !== destinationSwimlaneId) {
      updateAssigneeOnBackend(destinationSwimlaneId, draggableId);
    }

    // Remove story of the dragged issue from the state
    setStoryIdOfDraggedIssue(null);
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
