import React from 'react';
import useApiCall from '../../hooks/useApiCall';

/**
 * If the selected projects don't have any milestone a message
 * appears instead of the dropdown.
 */
function MilestoneDropDown({ selectedProjectIds, setSelectedMilestoneTitles }) {
  const [milestoneTitles, milestoneTitlesAreLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}/milestones`,
    'POST',
    selectedProjectIds
  );

  const handleChange = (e) => {
    if (e.target.value === 'Select milestone') {
      setSelectedMilestoneTitles([]);
      localStorage.setItem('milestoneTitles', []);
    } else if (e.target.value === 'allmilestones') {
      setSelectedMilestoneTitles(milestoneTitles);
      localStorage.setItem('milestoneTitles', milestoneTitles);
    } else {
      let newMilestoneTitle = [e.target.value];
      setSelectedMilestoneTitles(newMilestoneTitle);
      localStorage.setItem('milestoneTitles', newMilestoneTitle);
    }
  };

  const getSavedMilestonesValue = () => {
    let savedMilestoneTitlesString = localStorage.getItem('milestoneTitles');
    if (
      savedMilestoneTitlesString === null ||
      savedMilestoneTitlesString === undefined ||
      savedMilestoneTitlesString === '' ||
      savedMilestoneTitlesString === 'Select milestone'
    ) {
      return 'Select milestone';
    } else if (savedMilestoneTitlesString.split(',').length === 1) {
      return savedMilestoneTitlesString;
    } else return 'allmilestones';
  };

  let milestoneOptions = <p>No selected projects</p>;

  if (
    selectedProjectIds !== undefined &&
    selectedProjectIds !== null &&
    selectedProjectIds.length !== 0
  ) {
    let milestoneDropdown = <p>No milestones in the selected projects.</p>;

    if (
      !milestoneTitlesAreLoading &&
      milestoneTitles !== undefined &&
      milestoneTitles !== null &&
      milestoneTitles.length !== 0
    ) {
      milestoneOptions = milestoneTitles.map((milestone, index) => (
        <option key={index} value={milestone}>
          {milestone}
        </option>
      ));

      milestoneDropdown = (
        <select
          className="custom-select"
          value={getSavedMilestonesValue()}
          onChange={(e) => handleChange(e)}
        >
          <option value="Select milestone">Select milestone</option>
          <option value="allmilestones">Select all</option>
          {milestoneOptions}
        </select>
      );
    }

    return milestoneDropdown;
  }

  return milestoneOptions;
}

export default MilestoneDropDown;
