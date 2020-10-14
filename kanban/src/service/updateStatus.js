import axios from "axios";
import { getLastPartAfterSlash } from "../util/getLastPartAfterSlash";

/**
 * After dropping an issue to another column updating status of issue begins.
 * @param {*} sourceCell
 * @param {*} destinationCell
 * @param {*} card
 * @param {string} id
 */
export const updateStatus = (sourceCell, destinationCell, card, id) => {
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

  // Update status
  axios({
    method: "POST",
    withCredentials: true,
    url: `${process.env["REACT_APP_SERVER"]}${process.env["REACT_APP_SERVER_UPDATE"]}`,
    data: { projectID, id, newLabel },
  }).then((response) => {});
};
