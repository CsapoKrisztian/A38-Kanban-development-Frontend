import React from "react";
import Information from "../Information";

function Notes(props) {
  let userNotesCount = props.userNotesCount != null ? props.userNotesCount : 0;
  return (
    <React.Fragment>
      <i className="far fa-comments"></i>
      <Information className="ml-1">{userNotesCount}</Information>
    </React.Fragment>
  );
}

export default Notes;
