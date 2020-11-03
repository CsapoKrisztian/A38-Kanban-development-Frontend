import React, { useContext } from "react";
import Loading from "../components/reuseables/Loading";
import KanbanTable from "./KanbanTable";
import { StatusContext } from "../context/StatusContext";

/**
 * Fetches statuses and renders KanbanTable
 */
function Board(props) {
  let content = <Loading />;

  const [statuses, statusesAreLoading] = useContext(StatusContext);

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
