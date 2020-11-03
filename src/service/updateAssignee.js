import axios from "axios";

/**
 * After dropping an issue to another assignee row updating assignee of issue begins.
 * @param {*} sourceCell
 * @param {*} destinationCell
 * @param {string} issueId
 */
export const updateAssignee = (sourceCell, destinationCell, issueId) => {
  // Compare old and new assignee
  // If assignee has not changed no need to update the assignee
  let oldAssigneeId = sourceCell.parentNode.querySelector(".assigneeName").id;
  let newAssigneeId = destinationCell.parentNode.querySelector(".assigneeName").id;

  if (oldAssigneeId === newAssigneeId) return;

  // Check if issue is unassigned or incorrect
  newAssigneeId =
    newAssigneeId === undefined || newAssigneeId === null
      ? "unassigned"
      : newAssigneeId;

  // Update assignee
  axios({
    method: "POST",
    withCredentials: true,
    url: `${process.env["REACT_APP_SERVER"]}${process.env["REACT_APP_SERVER_UPDATE_ASSIGNEE"]}`,
    data: { issueId, newAssigneeId },
  })
  .catch(error => console.log(error));
};
