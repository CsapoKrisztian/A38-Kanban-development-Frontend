import React from "react";
import useApiCall from "../hooks/useApiCall";
import styled from "styled-components";
import Card from "./Card";
import { CircleButton, CircleImg } from "./Circle";
import { Droppable, DragDropContext } from "react-beautiful-dnd";

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

const getCard = (issue, status, index) => {
  if (issue.status.title === status) {
    return <Card key={issue.id} issue={issue} index={index} />;
  }
};

const renderRow = (statuses, issues, swimlaneClassName) => {
  return statuses.map((status, index) => (
    <Droppable droppableId={`${swimlaneClassName}-${getAlphaNumeric(status)}`}>
      {(provided) => (
        <td
          ref={provided.innerRef}
          {...provided.droppableProps}
          key={index}
          className={`col ${swimlaneClassName} ${getAlphaNumeric(status)}`}
        >
          {issues.map((issue, index) => getCard(issue, status, index))}
          {provided.placeholder}
        </td>
      )}
    </Droppable>
  ));
};

const getAssigneeBox = (assignee, defaultImg) => {
  const addDefaultSrc = (ev) => {
    ev.target.src =
      "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";
  };

  let avatarSrc =
    assignee.avatarUrl.indexOf("https") !== -1
      ? assignee.avatarUrl
      : `${process.env["REACT_APP_GITLAB_SERVER"]}${assignee.avatarUrl}`;

  let assigneeCircle = (
    <CircleButton size={"60px"}>
      <CircleImg onError={addDefaultSrc} src={avatarSrc} alt={assignee.name} />
    </CircleButton>
  );
  return (
    <div className="text-secondary font-weight-bold">
      <div className="row d-flex justify-content-center">{assigneeCircle}</div>
      <div className="text-center p-2">{assignee.name}</div>
    </div>
  );
};

const getContentOfFirstCellInRow = (item, swimlane) => {
  if (swimlane === "STORY") {
    return (
      <h5 className="text-secondary font-weight-bold">{item.story.title}</h5>
    );
  }

  return getAssigneeBox(item.assignee);
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

const handleOnDragEnd = (result) => {
  const { destination, source, draggableId } = result;
  if (!destination) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }
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
    if (
      (props.swimlane === "STORY" && issues[0].hasOwnProperty("story")) ||
      (props.swimlane === "ASSIGNEE" && issues[0].hasOwnProperty("assignee"))
    ) {
      tableBody = (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {renderContentOfTBody(issues, props.statuses, props.swimlane)}
        </DragDropContext>
      );
    }
  }

  return <React.Fragment>{tableBody}</React.Fragment>;
}

export default RenderIssues;
