import React from 'react';
import { CircleButton, CircleImg } from '../components/reuseables/Circle';

/**
 * Renders a circle with the picture of the assignee and under the circle
 * the name of the assignee.
 * @param {*} assignee
 */
const AssigneeBox = (assignee) => {
  if (assignee === undefined || assignee === null) return;
  const addDefaultSrc = (ev) => {
    ev.target.src = `${process.env['REACT_APP_DEFAULT_AVATAR_IMG']}`;
  };

  let avatarSrc =
    assignee.avatarUrl.indexOf('http') !== -1
      ? assignee.avatarUrl
      : `${process.env['REACT_APP_GITLAB_SERVER']}${assignee.avatarUrl}`;

  let assigneeCircle = (
    <CircleButton size={'60px'}>
      <CircleImg onError={addDefaultSrc} src={avatarSrc} alt={assignee.name} />
    </CircleButton>
  );
  return (
    <div className="text-secondary font-weight-bold">
      <div className="row d-flex justify-content-center">{assigneeCircle}</div>
      <div className="text-center p-2 assigneeName" id={assignee.id}>
        {assignee.name}
      </div>
    </div>
  );
};

export default AssigneeBox;
