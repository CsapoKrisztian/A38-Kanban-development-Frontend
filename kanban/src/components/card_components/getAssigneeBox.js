import React from "react";
import { CircleButton, CircleImg } from "../reuseables/Circle";

export const getAssigneeBox = (assignee) => {
  if (assignee === null) return;
  const defaultSrc = `${process.env["REACT_APP_DEFAULT_AVATAR_IMG"]}`;
  const addDefaultSrc = (ev) => {
    ev.target.src = defaultSrc;
  };

  let avatarSrc = defaultSrc;
  if (assignee.avatarUrl !== null) {
    avatarSrc =
      assignee.avatarUrl.indexOf("https") !== -1
        ? assignee.avatarUrl
        : `${process.env["REACT_APP_GITLAB_SERVER"]}${assignee.avatarUrl}`;
  }
  let assigneeCircle = "";
  if (assignee != null) {
    assigneeCircle = (
      <CircleButton>
        <CircleImg
          onError={addDefaultSrc}
          src={avatarSrc}
          alt={assignee.name}
        />
      </CircleButton>
    );
  }
  return <div className="text-center pb-1 pt-1 pr-2">{assigneeCircle}</div>;
};
