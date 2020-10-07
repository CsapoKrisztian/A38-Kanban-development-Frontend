import React, { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

function GetIssueButton() {
  const [
    swimlane,
    setSwimlane,
    projectIds,
    setProjectIds,
    milestoneTitles,
    setMilestoneTitles,
    storyTitles,
    setStoryTitles,
    requestIssues,
    setRequestIssues,
  ] = useContext(FilterContext);

  let disabled = true;

  if (
    projectIds !== undefined &&
    projectIds !== null &&
    projectIds.length > 0
  ) {
    disabled = false;
  }

  const getIssues = () => {
    if (!requestIssues) {
      setRequestIssues(true);
    }
  };

  return (
    <React.Fragment>
      <button
        type="button"
        disabled={disabled}
        className="btn btn-info btn-block"
        onClick={() => getIssues()}
      >
        Get issues
      </button>
    </React.Fragment>
  );
}

export default GetIssueButton;
