import React, { useState } from "react";
import useApiCall from "../hooks/useApiCall";
import styled from "styled-components";
import Card from "./Card";
import { CircleButton, CircleImg } from "./Circle";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import { getLastPartAfterSlash, openTab } from "../service/Util";
import { Link } from "react-router-dom";
import Gray from "./Gray";

const FirstCell = styled.td`
  min-height: 100px !important;
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

const renderRow = (statuses, issues, swimlaneClassName, isDropDisabled) => {
  return statuses.map((status, index) => (
    <Droppable
      droppableId={`${swimlaneClassName}${getAlphaNumeric(status)}`}
      isDropDisabled={isDropDisabled}
    >
      {(provided) => (
        <td
          id={`${swimlaneClassName}${getAlphaNumeric(status)}`}
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

const getAssigneeBox = (assignee) => {
  if (assignee === undefined || assignee === null) return;
  const addDefaultSrc = (ev) => {
    ev.target.src = `${process.env["REACT_APP_DEFAULT_IMG"]}`;
  };

  let avatarSrc =
    assignee.avatarUrl.indexOf("http") !== -1
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
      <div className="text-center p-2 assigneeName" id={assignee.id}>
        {assignee.name}
      </div>
    </div>
  );
};

const getStoryBox = (story) => {
  let description = "";

  if (story.description !== undefined && story.description !== null) {
    description = story.description;
    if (description.indexOf("http") !== -1) {
      let webUrl = description;
      description = (
        <Link onClick={() => openTab(webUrl)}>
          <Gray>
            <i className="fas fa-external-link-square-alt"></i>
          </Gray>
        </Link>
      );
    }
  }

  return (
    <React.Fragment>
      <h5 className="text-secondary font-weight-bold m-3">{story.title}</h5>
      <span>
        <Gray className="font-weight-light">{description}</Gray>
      </span>
    </React.Fragment>
  );
};

const getContentOfFirstCellInRow = (item, swimlane) => {
  if (swimlane === "STORY") {
    return getStoryBox(item.story);
  }
  console.log(swimlane);

  let unassigned = {
    name: "Unassigned",
    avatarUrl: `${process.env["REACT_APP_DEFAULT_IMG"]}`,
  };
  if (item.assignee === null) return getAssigneeBox(unassigned);
  return getAssigneeBox(item.assignee);
};

const renderContentOfTBody = (
  issues,
  statuses,
  swimlane,
  storyOfDraggedIssue
) => {
  return issues.map((item, index) => (
    <tr key={index}>
      <FirstCell>
        <div className="mt-4 pt-2 mb-4 pb-2 text-center">
          {getContentOfFirstCellInRow(item, swimlane)}
        </div>
      </FirstCell>
      {renderRow(
        statuses,
        item.issues,
        getAlphaNumeric(
          swimlane === "STORY"
            ? item.story.title
            : item.assignee !== null
            ? item.assignee.name
            : "Unassigned"
        ),
        swimlane === "STORY" && storyOfDraggedIssue !== item.story.title
          ? true
          : false
      )}
    </tr>
  ));
};

const updateStatus = (sourceCell, destinationCell, card, id) => {
  // Compare index of source and destination cell to find out has status changed or not
  // If status has not changed no need to update the status
  let indexOfSourceCell = Array.prototype.indexOf.call(
    sourceCell.parentNode.children,
    sourceCell
  );
  let indexOfDestinationCell = Array.prototype.indexOf.call(
    destinationCell.parentNode.children,
    destinationCell
  );
  if (indexOfSourceCell === indexOfDestinationCell) return;

  // Get new status
  let newLabel = document.querySelector(
    "#board th:nth-child(" + (indexOfDestinationCell + 1) + ")"
  ).innerHTML;

  // Get projectID
  let longProjectId = card
    .querySelector(".projectname")
    .getAttribute("data-project-id");
  let projectID = getLastPartAfterSlash(longProjectId);

  console.log(projectID);
  console.log(id);
  console.log(newLabel);
  // Update status
  axios({
    method: "POST",
    withCredentials: true,
    url: `${process.env["REACT_APP_SERVER"]}/update`,
    data: { projectID, id, newLabel },
  }).then((response) => {});
};

const updateAssignee = (sourceCell, destinationCell, issueID) => {
  // Compare old and new assignee
  // If assignee has not changed no need to update the assignee
  let oldAssigneeId = sourceCell.parentNode.querySelector(".assigneeName").id;
  let newAssigneeId = destinationCell.parentNode.querySelector(".assigneeName")
    .id;
  if (oldAssigneeId === newAssigneeId) return;

  // Update assignee
  let assignee =
    newAssigneeId === undefined || newAssigneeId === null
      ? "unassigned"
      : newAssigneeId;
  axios({
    method: "POST",
    withCredentials: true,
    url: `${process.env["REACT_APP_SERVER"]}/newAssignee`,
    data: { assignee, issueID },
  }).then((response) => {});
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

  const [storyOfDraggedIssue, setStoryOfDraggedIssue] = useState("");

  const handleOnDragStart = (start) => {
    let card = document.getElementById(start.draggableId);
    let ribbon = card.querySelector(".storyRibbon");
    if (ribbon !== undefined && ribbon !== null) {
      setStoryOfDraggedIssue(ribbon.innerHTML);
    }

    console.log(storyOfDraggedIssue);
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

    let sourceCell = document.getElementById(source.droppableId);
    let destinationCell = document.getElementById(destination.droppableId);
    let card = document.getElementById(draggableId);

    // Append destination cell with the dragged issue card
    destinationCell.appendChild(card);
    updateStatus(sourceCell, destinationCell, card, draggableId);
    if (props.swimlane === "ASSIGNEE") {
      updateAssignee(sourceCell, destinationCell, draggableId);
    }

    setStoryOfDraggedIssue("");
  };

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
      console.log(issues);
      tableBody = (
        <DragDropContext
          onDragEnd={handleOnDragEnd}
          onDragStart={handleOnDragStart}
        >
          {renderContentOfTBody(
            issues,
            props.statuses,
            props.swimlane,
            storyOfDraggedIssue
          )}
        </DragDropContext>
      );
    }
  }

  return <React.Fragment>{tableBody}</React.Fragment>;
}

export default RenderIssues;
