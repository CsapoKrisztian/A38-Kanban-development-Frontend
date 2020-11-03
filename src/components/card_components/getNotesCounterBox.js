import React from "react";
import Information from "./Information";

/**
 * Display the notes of users with a text bubble icon
 * @param {*} userNotesCount
 */
export const getNotesCounterBox = (userNotesCount) => {
  userNotesCount = userNotesCount != null ? userNotesCount : 0;
  return (
    <div className="col text-left d-flex align-items-center">
      <i className="far fa-comments"></i>
      <Information className="ml-1">{userNotesCount}</Information>
    </div>
  );
};
