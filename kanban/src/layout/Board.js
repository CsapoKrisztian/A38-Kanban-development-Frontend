import React from "react";
import Loading from "../styled_components/Loading";
import KanbanTable from "./KanbanTable";
import useApiCall from "../hooks/useApiCall";

function Board() {
  let content = <Loading />;

  const [statuses, statusesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/statuses`,
    "GET"
  );

  if (!statusesAreLoading && statuses) {
    content = (
      <React.Fragment>
        <KanbanTable statuses={statuses} />
      </React.Fragment>
    );
  }

  return content;
}

export default Board;
