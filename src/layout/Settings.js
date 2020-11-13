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
import StorySelector from '../components/sidebar_components/StorySelector';
import MilestoneSelector from '../components/sidebar_components/MilestoneSelector';

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
  const [settingsSwimlane, setSettingsSwimlane] = useState(swimlane);
  const [settingsProjectIds, setSettingsProjectIds] = useState(
    filterProjectIds
  );
  const [settingsMilestoneTitles, setSettingsMilestoneTitles] = useState(
    filterMilestoneTitles
  );
  const [settingsStoryTitles, setSettingsStoryTitles] = useState(
    filterStoryTitles
  );

  const setFilters = () => {
    setSwimlane(settingsSwimlane);
    setFilterProjectIds([...settingsProjectIds]);
    setFilterMilestoneTitles([...settingsMilestoneTitles]);
    setFilterStoryTitles([...settingsStoryTitles]);
  };

  /**
   * While no project is selected "Get issues" button is disabled
   */
  let disabled =
    settingsProjectIds === undefined ||
    settingsProjectIds === null ||
    settingsProjectIds.length === 0;

  return (
    <SideMenu style={currentStyle} className="sidenav">
      <Wrapper>
        <Subtitle>SWIMLANES</Subtitle>
        <FilterBox className="d-flex justify-content-between">
          <div className="text-left">Assignee</div>
          <div className="text-center">
            <ToggleSwitch
              settingsSwimlane={settingsSwimlane}
              setSettingsSwimlane={setSettingsSwimlane}
            />
          </div>
          <div className="text-right">Story</div>
        </FilterBox>

        <Subtitle>PROJECTS</Subtitle>
        <FilterBox>
          <ScrollableBox>
            <ProjectLabels
              settingsProjectIds={settingsProjectIds}
              setSettingsProjectIds={setSettingsProjectIds}
            />
          </ScrollableBox>
        </FilterBox>

        <Subtitle>STORIES</Subtitle>
        <FilterBox>
          <ScrollableBox>
            <StorySelector
              settingsProjectIds={settingsProjectIds}
              settingsStoryTitles={settingsStoryTitles}
              setSettingsStoryTitles={setSettingsStoryTitles}
            />
          </ScrollableBox>
        </FilterBox>

        <Subtitle>MILESTONE</Subtitle>
        <FilterBox>
          <MilestoneSelector
            settingsProjectIds={settingsProjectIds}
            setSettingsMilestoneTitles={setSettingsMilestoneTitles}
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
