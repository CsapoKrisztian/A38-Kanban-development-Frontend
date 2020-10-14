import axios from "axios";

/**
 * After dropping an issue to another assignee row updating assignee of issue begins.
 * @param {*} sourceCell
 * @param {*} destinationCell
 * @param {string} issueID
 */
export const updateAssignee = (sourceCell, destinationCell, issueID) => {
  // Compare old and new assignee
  // If assignee has not changed no need to update the assignee
  let oldAssigneeId = sourceCell.parentNode.querySelector(".assigneeName").id;
  let newAssigneeId = destinationCell.parentNode.querySelector(".assigneeName")
    .id;

  if (oldAssigneeId === newAssigneeId) return;

  // Check if issue is unassigned or incorrect
  let assignee =
    newAssigneeId === undefined || newAssigneeId === null
      ? "unassigned"
      : newAssigneeId;

  // Update assignee
  axios({
    method: "POST",
    withCredentials: true,
    url: `${process.env["REACT_APP_SERVER"]}${process.env["REACT_APP_SERVER_NEW_ASSIGNEE"]}`,
    data: { assignee, issueID },
  }).then((response) => {});
};
