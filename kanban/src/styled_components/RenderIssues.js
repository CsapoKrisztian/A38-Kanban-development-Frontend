import React, { useState } from "react";
import useApiCall from "../hooks/useApiCall";
import styled from "styled-components";
import Card from "./Card";
import { CircleButton, CircleImg } from "./Circle";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import { getLastPartAfterSlash } from "../service/Util";

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

const renderRow = (statuses, issues, swimlaneClassName, isDropDisabled) => {
  console.log("object");
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

const renderContentOfTBody = (
  issues,
  statuses,
  swimlane,
  storyOfDraggedIssue
) => {
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
        ),
        swimlane === "STORY" && storyOfDraggedIssue === item.story.title
          ? true
          : false
      )}
    </tr>
  ));
};

const updateStatus = (sourceCell, destinationCell, card, id) => {
  // Compare index of source and destination cell to find out has status changed or not
  let indexOfSourceCell = Array.prototype.indexOf.call(
    sourceCell.parentNode.children,
    sourceCell
  );
  let indexOfDestinationCell = Array.prototype.indexOf.call(
    destinationCell.parentNode.children,
    destinationCell
  );

  console.log(indexOfSourceCell);
  console.log(indexOfDestinationCell);
  // If status has not changed no need to update the status
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

  // Update status
  axios({
    method: "POST",
    withCredentials: true,
    url: `${process.env["REACT_APP_SERVER"]}/update`,
    data: { projectID, id, newLabel },
  }).then((response) => {
    console.log(response.data);
  });
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
    if (ribbon !== undefined && ribbon !== null)
      setStoryOfDraggedIssue(ribbon.innerHTML);
  };

  const handleOnDragEnd = (result) => {
    console.log(result);
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

    // Append destination cell with the dragged issue card if the destination is valid
    if (updateStatus(sourceCell, destinationCell, card, draggableId)) {
      destinationCell.appendChild(card);
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
