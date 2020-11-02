import React from "react";
import Information from "./Information";

/**
 * Display the due date with a calendar icon
 * @param {*} dueDate
 */
export const getDueDateBox = (dueDate) => {
  if (dueDate != null) {
    return (
      <Information>
        <i className="far fa-calendar-alt"></i> {dueDate}
      </Information>
    );
  }
  return "";
};
