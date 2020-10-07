import React, { useContext } from "react";
import useApiCall from "../hooks/useApiCall";
import styled from "styled-components";
import Card from "./Card";
import { FilterContext } from "../context/FilterContext";

const Center = styled.th`
  position: relative;
`;

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const getAlphaNumeric = (str) => {
  if (str === "" || str === undefined) return "";
  return str.replace(/[\W_]+/g, "");
};

const getCard = (issue, status) => {
  if (issue.status.title === status) {
    return <Card key={issue.id} issue={issue} />;
  }
};

const renderRow = (statuses, issues, swimlaneClassName) => {
  return statuses.map((status) => (
    <td
      key={status.title}
      className={`col ${swimlaneClassName} ${getAlphaNumeric(status)}`}
    >
      {issues.map((issue) => getCard(issue, status))}
    </td>
  ));
};

const getContentOfFirstCellInRow = (item, swimlane) => {
  if (swimlane === "STORY") {
    return item.story.title;
  }

  let user = ""; //TODO
  return user;
};

const renderContentOfTBody = (issues, statuses, swimlane) => {
  return issues.map((item, index) => (
    <tr key={index}>
      <Center className="col">
        <Inner>{getContentOfFirstCellInRow(item, swimlane)}</Inner>
      </Center>
      {renderRow(statuses, item.issues, getAlphaNumeric(item.story.title))}
    </tr>
  ));
};

function RenderIssues(props) {
  const [swimlane, projectIds, milestoneTitles, storyTitles] = useContext(
    FilterContext
  );
  const [issuesByStory, issuesByStoryAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/issues/orderByStory`,
    "POST",
    projectIds,
    milestoneTitles,
    storyTitles
  );

  let tableBody = "";

  if (!issuesByStoryAreLoading && issuesByStory) {
    tableBody = renderContentOfTBody(issuesByStory, props.statuses, swimlane);
  }

  return <React.Fragment>{tableBody}</React.Fragment>;
}

export default RenderIssues;
