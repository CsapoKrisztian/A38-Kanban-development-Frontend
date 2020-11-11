import React, { useState } from 'react';

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

const Field = ({
  issuesFilteredByStatus,
  status,
  swimlaneId,
  isDropDisabled,
}) => {
  const [fieldIssues] = useState(
    issuesFilteredByStatus.sort(compareByPriority)
  );

  const droppableId = getAlphaNumeric(`${swimlaneId}${status}`);

  console.log('\nField before return status issuesFiltered by status');
  console.log(status);
  console.log(issuesFilteredByStatus);

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
          {fieldIssues.map((issue, index) => (
            <IssueCard key={issue.id} issue={issue} index={index} />
          ))}
          {provided.placeholder}
        </td>
      )}
    </Droppable>
  );
};

export default Field;
