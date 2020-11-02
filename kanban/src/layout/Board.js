import React from "react";
import Loading from "../components/reuseables/Loading";
import KanbanTable from "./KanbanTable";
import useApiCall from "../hooks/useApiCall";

/**
 * Fetches statuses and renders KanbanTable
 */
function Board(props) {
  let content = <Loading />;

  const [statuses, statusesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}${process.env["REACT_APP_SERVER_STATUSES"]}`,
    "GET"
  );

  /**
   * While statuses are loading a spinner is rendered
   */
  if (!statusesAreLoading && statuses) {
    content = (
      <React.Fragment>
        <KanbanTable statuses={statuses} tableBody={props.tableBody}/>
      </React.Fragment>
    );
  }

  return content;
}

export default Board;
