import React from 'react';
import useApiCall from '../../hooks/useApiCall';

/**
 * Fetches milestones and by project ids and shows them in a dropdown
 * @param {*} props
 */
function MilestoneOptions({ settingsProjectIds, setSettingsMilestoneTitles }) {
  let milestoneDropdown = <p>No milestones in the selected projects.</p>;

  const [milestoneTitles, milestoneTitlesAreLoading] = useApiCall(
    `${process.env['REACT_APP_SERVER']}/milestones`,
    'POST',
    settingsProjectIds
  );

  let milestoneOptions = '';

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

    const handleChange = (e) => {
      if (e.target.value === 'Select milestone') {
        setSettingsMilestoneTitles([]);
        localStorage.setItem('milestoneTitles', []);
      } else if (e.target.value === 'allmilestones') {
        setSettingsMilestoneTitles(milestoneTitles);
        localStorage.setItem('milestoneTitles', milestoneTitles);
      } else {
        let newMilestoneTitle = [e.target.value];
        setSettingsMilestoneTitles(newMilestoneTitle);
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

export default MilestoneOptions;
