import React from "react";
import styled from "styled-components";

const PriorityBadge = styled.span`
  background-color: ${(props) =>
    props.color ? props.color : "#6c757d"} !important;
`;

/**
 * Render priority if exist with the its original color
 * @param {*} priority
 */
export const getPriorityBox = (priority) => {
  let badge = (
    <span className="badge badge-secondary text-secondary p-2"></span>
  );

  if (priority != null) {
    badge = (
      <PriorityBadge className="badge badge-danger p-2" color={priority.color}>
        {priority.title.slice(-2)}
      </PriorityBadge>
    );
  }

  return (
    <div className="col text-right d-flex justify-content-end">
      <h6 className="align-self-center">{badge}</h6>
    </div>
  );
};
