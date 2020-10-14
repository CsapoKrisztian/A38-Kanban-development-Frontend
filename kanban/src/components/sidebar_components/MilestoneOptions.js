import React, { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import useApiCall from "../../hooks/useApiCall";

/**
 * Fetches milestones and by project ids and shows them in a dropdown
 * @param {*} props
 */
function MilestoneOptions(props) {
  let milestoneDropdown = <p>No milestones in the selected projects.</p>;

  const [milestones, milestonesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/milestones`,
    "POST",
    props.projectIds
  );

  const [
    swimlane,
    setSwimlane,
    projectIds,
    setProjectIds,
    milestoneTitles,
    setMilestoneTitles,
    storyTitles,
    setStoryTitles,
  ] = useContext(FilterContext);

  const handleChange = (e) => {
    if (e.target.value === "0") {
      setMilestoneTitles([]);
    } else if (e.target.value === "allmilestones") {
      setMilestoneTitles(milestones);
    } else {
      setMilestoneTitles([e.target.value]);
    }
  };

  let milestoneOptions = "";

  if (
    !milestonesAreLoading &&
    milestones !== undefined &&
    milestones !== null &&
    milestones.length != 0
  ) {
    milestoneOptions = milestones.map((milestone, index) => (
      <option key={index} value={milestone}>
        {milestone}
      </option>
    ));

    milestoneDropdown = (
      <React.Fragment>
        <select className="custom-select" onChange={(e) => handleChange(e)}>
          <option defaultValue="0">Select milestone</option>
          <option value="allmilestones">Select all</option>
          {milestoneOptions}
        </select>
      </React.Fragment>
    );
  }

  return milestoneDropdown;
}

export default MilestoneOptions;
