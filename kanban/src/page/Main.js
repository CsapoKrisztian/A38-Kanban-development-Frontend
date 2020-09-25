import React from "react";
import Loading from "../styled_components/Loading";
import KanbanTable from "../layout/KanbanTable";
import Filters from "../styled_components/Filters";
import useApiCall from "../hooks/useApiCall";
import serverUrl from "../context/ServerUrl";

function Main() {
  let content = <Loading />;
  const [statuses, statusesAreLoading] = useApiCall(`${serverUrl}/statuses`);

  let projects = ["Project1", "Project2", "Project6"];
  let milestone = ["X"];

  if (!statusesAreLoading && statuses) {
    content = (
      <React.Fragment>
        <Filters projects={projects} milestone={milestone}></Filters>
        <KanbanTable statuses={statuses} />
      </React.Fragment>
    );
  }

  return content;
}

export default Main;
