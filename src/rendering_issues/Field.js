import React from 'react';

import { Droppable } from 'react-beautiful-dnd';
import { getAlphaNumeric } from '../util/getAlphaNumeric';
import { IssueCard } from './IssueCard';

// On the beginning of the drag story is stored in the state

const compareByPriority = (issue1, issue2) => {
  if (issue1.priority === null) return 1;
  if (issue2.priority === null) return -1;
  if (issue1.priority.priorityNum > issue2.priority.priorityNum) return 1;
  if (issue1.priority.priorityNum < issue2.priority.priorityNum) return -1;
  return 0;
};

const Field = ({ issues, status, swimlaneClassName, isDropDisabled }) => {
  return (
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
          {issues.sort(compareByPriority).map((issue, index) => (
            <IssueCard key={issue.id} issue={issue} index={index} />
          ))}
          {provided.placeholder}
        </td>
      )}
    </Droppable>
  );
};

export default Field;
