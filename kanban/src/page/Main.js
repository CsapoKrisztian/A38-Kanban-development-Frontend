import React, { useState } from "react";
import Loading from "../styled_components/Loading";
import KanbanTable from "../layout/KanbanTable";
import Filters from "../styled_components/Filters";

import useApiCall from "../hooks/useApiCall";

function Main() {
  const [projectIds, setProjectIds] = useState([
    "gid://gitlab/Project/1",
    "gid://gitlab/Project/2",
    "gid://gitlab/Project/3",
    "gid://gitlab/Project/4",
    "gid://gitlab/Project/5",
    "gid://gitlab/Project/6",
    "gid://gitlab/Project/7",
  ]);

  const [milestoneTitles, setMileStoneTitles] = useState([
    "Milestone 4",
    "Milestone 1",
    "Milestone 3",
    "Milestone 2",
    "Milestone 5",
  ]);

  const [storyTitles, setStoryTitles] = useState([
    "Documentation",
    "Test story 1",
    "Test story 2",
    "Test story 3",
    "Test story 4",
    "Test story 5",
  ]);

  let content = <Loading />;
  const [statuses, statusesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/statuses`,
    "GET"
  );
  const [issuesByStory, issuesByStoryAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/issues/orderByStory`,
    "POST",
    projectIds,
    milestoneTitles,
    storyTitles
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
