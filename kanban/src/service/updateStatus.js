import axios from "axios";

/**
 * After dropping an issue to another column updating status of issue begins.
 * @param {*} sourceCell
 * @param {*} destinationCell
 * @param {string} issueId
 */
export const updateStatus = (sourceCell, destinationCell, issueId) => {
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
  let newStatusTitle = document.querySelector(
    "#board th:nth-child(" + (indexOfDestinationCell + 1) + ")"
  ).innerHTML;

  // Update status
  axios({
    method: "POST",
    withCredentials: true,
    url: `${process.env["REACT_APP_SERVER"]}${process.env["REACT_APP_SERVER_UPDATE_STATUS"]}`,
    data: { issueId, newStatusTitle },
  }).then((response) => console.log(response.data))
  .catch(error => console.log(error));
};
