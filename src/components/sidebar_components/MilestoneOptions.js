import React, { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import useApiCall from "../../hooks/useApiCall";

/**
 * Fetches milestones and by project ids and shows them in a dropdown
 * @param {*} props
 */
function MilestoneOptions(props) {
  let milestoneDropdown = <p>No milestones in the selected projects.</p>;

  const [allMilestoneTitles, allMilestoneTitlesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/milestones`,
    "POST",
    props.projectIds
  );

  const [
    projectIds,
    setProjectIds,
    swimlane,
    setSwimlane,
    milestoneTitles,
    setMilestoneTitles,
  ] = useContext(FilterContext);

  let milestoneOptions = "";

  if (
    !allMilestoneTitlesAreLoading &&
    allMilestoneTitles !== undefined &&
    allMilestoneTitles !== null &&
    allMilestoneTitles.length !== 0
  ) {
    milestoneOptions = allMilestoneTitles.map((milestone, index) => (
      <option key={index} value={milestone}>
        {milestone}
      </option>
    ));

    const handleChange = (e) => {
      if (e.target.value === "Select milestone") {
        setMilestoneTitles([]);
        localStorage.setItem("milestoneTitles", []);
      } else if (e.target.value === "allmilestones") {
        setMilestoneTitles(allMilestoneTitles);
        localStorage.setItem("milestoneTitles", allMilestoneTitles);
      } else {
        let newMilestoneTitle = [e.target.value];
        setMilestoneTitles(newMilestoneTitle);
        localStorage.setItem("milestoneTitles", newMilestoneTitle);
      }
    };

    const getSavedMilestonesValue = () => {
      let savedMilestoneTitlesString = localStorage.getItem('milestoneTitles');
      if (
        savedMilestoneTitlesString === null 
        || savedMilestoneTitlesString === undefined 
        || savedMilestoneTitlesString === '' 
        || savedMilestoneTitlesString === 'Select milestone'
        ) {
        return 'Select milestone';
      } else if (savedMilestoneTitlesString.split(',').length === 1) {
        return savedMilestoneTitlesString;
      } else return 'allmilestones';
    }

    milestoneDropdown = (
        <select className="custom-select" value={getSavedMilestonesValue()} onChange={(e) => handleChange(e)}>
          <option value='Select milestone'>Select milestone</option>
          <option value="allmilestones">Select all</option>
          {milestoneOptions}
        </select>
    );
  }

  return milestoneDropdown;
}

export default MilestoneOptions;
