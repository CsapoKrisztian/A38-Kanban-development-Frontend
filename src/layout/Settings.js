import React, { useState } from 'react';
import ToggleSwitch from '../components/sidebar_components/ToggleSwitch';
import {
  SideMenu,
  Subtitle,
  FilterBox,
  ScrollableBox,
  Wrapper,
} from '../components/sidebar_components/SidebarStyle';
import ProjectLabels from '../components/sidebar_components/ProjectLabels';
import StoryLabels from '../components/sidebar_components/StoryLabels';
import MilestoneDropDown from '../components/sidebar_components/MilestoneDropDown';

/**
 * Renders the sidebar for filter settings
 * @param {*} props: currentStyle - the sidebar is opened or closed
 */
const Settings = ({
  currentStyle,
  swimlane,
  setSwimlane,
  filterProjectIds,
  setFilterProjectIds,
  filterMilestoneTitles,
  setFilterMilestoneTitles,
  filterStoryTitles,
  setFilterStoryTitles,
}) => {
  const [selectedSwimlane, setSelectedSwimlane] = useState(swimlane);
  const [selectedProjectIds, setSelectedProjectIds] = useState(
    filterProjectIds
  );
  const [selectedMilestoneTitles, setSelectedMilestoneTitles] = useState(
    filterMilestoneTitles
  );
  const [selectedStoryTitles, setSelectedStoryTitles] = useState(
    filterStoryTitles
  );

  const setFilters = () => {
    setSwimlane(selectedSwimlane);
    setFilterProjectIds([...selectedProjectIds]);
    setFilterMilestoneTitles([...selectedMilestoneTitles]);
    setFilterStoryTitles([...selectedStoryTitles]);
  };

  /**
   * While no project is selected "Get issues" button is disabled
   */
  let disabled =
    selectedProjectIds === undefined ||
    selectedProjectIds === null ||
    selectedProjectIds.length === 0;

  return (
    <SideMenu style={currentStyle} className="sidenav">
      <Wrapper>
        <Subtitle>SWIMLANES</Subtitle>
        <FilterBox className="d-flex justify-content-between">
          <div className="text-left">Assignee</div>
          <div className="text-center">
            <ToggleSwitch
              settingsSwimlane={selectedSwimlane}
              setSettingsSwimlane={setSelectedSwimlane}
            />
          </div>
          <div className="text-right">Story</div>
        </FilterBox>

        <Subtitle>PROJECTS</Subtitle>
        <FilterBox>
          <ScrollableBox>
            <ProjectLabels
              settingsProjectIds={selectedProjectIds}
              setSettingsProjectIds={setSelectedProjectIds}
            />
          </ScrollableBox>
        </FilterBox>

        <Subtitle>STORIES</Subtitle>
        <FilterBox>
          <ScrollableBox>
            <StoryLabels
              settingsProjectIds={selectedProjectIds}
              settingsStoryTitles={selectedStoryTitles}
              setSettingsStoryTitles={setSelectedStoryTitles}
            />
          </ScrollableBox>
        </FilterBox>

        <Subtitle>MILESTONE</Subtitle>
        <FilterBox>
          <MilestoneDropDown
            settingsProjectIds={selectedProjectIds}
            setSettingsMilestoneTitles={setSelectedMilestoneTitles}
          />
        </FilterBox>

        <div className="w-100 d-flex justify-content-center mb-4 mt-4">
          <button // Get issues button
            type="button"
            disabled={disabled}
            className="btn btn-success"
            onClick={setFilters}
          >
            Get issues
          </button>
        </div>
      </Wrapper>
    </SideMenu>
  );
};

export default Settings;
