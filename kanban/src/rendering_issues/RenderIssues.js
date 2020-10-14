import React, { useState } from "react";
import useApiCall from "../hooks/useApiCall";
import { DragDropContext } from "react-beautiful-dnd";
import Loading from "../components/reuseables/Loading";
import { renderContentOfTBody } from "./renderContentOfTBody";
import { updateStatus } from "../service/updateStatus";
import { updateAssignee } from "../service/updateAssignee";

/**
 * Renders content of tbody
 * @param {*} props
 */
function RenderIssues(props) {
  // Get issues ordering by swimlane
  let urlGetIssues =
    props.swimlane === "STORY"
      ? process.env["REACT_APP_SERVER_ISSUES_BY_STORY"]
      : process.env["REACT_APP_SERVER_ISSUES_BY_ASSIGNEE"];

  const [issues, issuesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}${urlGetIssues}`,
    "POST",
    props.projectIds,
    props.milestoneTitles,
    props.storyTitles
  );

  // Value of storyOfDraggedIssue will be the story of the dragged issue.
  // The story of the destination cell should be the same, because the story
  // shouldn't change
  const [storyOfDraggedIssue, setStoryOfDraggedIssue] = useState("");

  // On the beginning of the drag story is stored in the state
  const handleOnDragStart = (start) => {
    let card = document.getElementById(start.draggableId);
    let ribbon = card.querySelector(".storyRibbon");
    if (ribbon !== undefined && ribbon !== null) {
      setStoryOfDraggedIssue(ribbon.innerHTML);
    }
  };

  // Validation of dragging and finalization of dropping
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
    updateStatus(sourceCell, destinationCell, draggableId);
    if (props.swimlane === "ASSIGNEE") {
      updateAssignee(sourceCell, destinationCell, draggableId);
    }

    // Remove story of the dragged issue from the state
    setStoryOfDraggedIssue("");
  };

  // Showing spinner while loading issues
  let tableBody = <tr></tr>;
  if (issuesAreLoading)
    tableBody = (
      <tr className="border-0">
        <td className="border-0" colSpan={props.statuses.length + 1}>
          <Loading />
        </td>
      </tr>
    );

  // Render table body after fetching is finished
  // DragDropContext is available only this entity
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
