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
  return statuses.map((status, index) => (
    <td
      key={index}
      className={`col ${swimlaneClassName} ${getAlphaNumeric(status)}`}
    >
      {issues.map((issue) => getCard(issue, status))}
    </td>
  ));
};

/*const getAssigneeBox = (assignee, defaultImg) => {
  const addDefaultSrc = (ev) => {
    ev.target.src =
      'https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';
  };

  let assigneeCircle = '';
  if (assignee != null) {
    assigneeCircle = (
      <CircleButton>
        <CircleImg
          onError={addDefaultSrc}
          src={assignee.avatarUrl}
          alt={assignee.name}
        />
      </CircleButton>
    );
  } // TODO img validation
return <div className="text-center p-2">{assigneeCircle}{assignee.name}</div>;
};*/

const getContentOfFirstCellInRow = (item, swimlane) => {
  if (swimlane === "STORY") {
    return item.story.title;
  }

  return item.assignee.name;
};

const renderContentOfTBody = (issues, statuses, swimlane) => {
  return issues.map((item, index) => (
    <tr key={index}>
      <Center className="col">
        <Inner>{getContentOfFirstCellInRow(item, swimlane)}</Inner>
      </Center>
      {renderRow(
        statuses,
        item.issues,
        getAlphaNumeric(
          swimlane === "STORY" ? item.story.title : item.assignee.name
        )
      )}
    </tr>
  ));
};

function RenderIssues(props) {
  let urlGetIssues =
    props.swimlane === "STORY"
      ? process.env["REACT_APP_ISSUES_BY_STORY"]
      : process.env["REACT_APP_ISSUES_BY_ASSIGNEE"];

  const [issues, issuesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}${urlGetIssues}`,
    "POST",
    props.projectIds,
    props.milestoneTitles,
    props.storyTitles
  );

  let tableBody = <tr></tr>;

  if (
    !issuesAreLoading &&
    issues !== undefined &&
    issues !== null &&
    issues.length > 0
  ) {
    tableBody = renderContentOfTBody(issues, props.statuses, props.swimlane);
  }

  return <React.Fragment>{tableBody}</React.Fragment>;
}

export default RenderIssues;
