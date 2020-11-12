import React, { useState } from 'react';

import { Droppable } from 'react-beautiful-dnd';
import { getAlphaNumeric } from '../util/getAlphaNumeric';
import { IssueCard } from './IssueCard';

const Field = ({ issues, status, swimlaneId, isDropDisabled }) => {
  const droppableId = getAlphaNumeric(`${swimlaneId}${status}`);

  return (
    <Droppable droppableId={droppableId} isDropDisabled={isDropDisabled}>
      {(provided) => (
        <td
          id={droppableId}
          status={status}
          swimlaneid={swimlaneId}
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`col ${swimlaneId} ${getAlphaNumeric(status)}`}
        >
          {issues.map((issue, index) => (
            <IssueCard key={issue.id} issue={issue} index={index} />
          ))}
          {provided.placeholder}
        </td>
      )}
    </Droppable>
  );
};

export default Field;
