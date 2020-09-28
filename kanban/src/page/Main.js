import React from "react";
import Loading from "../styled_components/Loading";
import KanbanTable from "../layout/KanbanTable";
import Filters from "../styled_components/Filters";
import useApiCall from "../hooks/useApiCall";
import serverUrl from "../context/ServerUrl";

function Main() {
  let content = <Loading />;
  const [statuses, statusesAreLoading] = useApiCall(`${serverUrl}/statuses`);
  const [issuesByStory, issuesByStoryAreLoading] = useApiCall(
    `${serverUrl}/issues/orderByStory`
  );

  let projects = ["Project1", "Project2", "Project6"];
  let milestone = ["X"];

  if (
    !statusesAreLoading &&
    statuses &&
    !issuesByStoryAreLoading &&
    issuesByStory
  ) {
    console.log(issuesByStory);
    content = (
      <React.Fragment>
        <Filters projects={projects} milestone={milestone}></Filters>
        <KanbanTable statuses={statuses} issues={issuesByStory} />
      </React.Fragment>
    );
  }

  return content;
}

export default Main;
