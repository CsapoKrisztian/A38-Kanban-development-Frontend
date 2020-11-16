import React, { useState, useContext } from 'react';
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

import { SwimlaneContext } from '../context/SwimlaneContext';
import { FilterProjectIdsContext } from '../context/FilterProjectIdsContext';
import { FilterMilestoneTitlesContext } from '../context/FilterMilestoneTitlesContext';
import { FilterStoryTitlesContext } from '../context/FilterStoryTitlesContext';

/**
 * Renders the sidebar to select filters
 * @param {*} props: currentStyle - the sidebar is opened or closed
 */
const Settings = ({ currentStyle }) => {
  // These are the filters that are actually used in the requests to the backend
  const [swimlane, setSwimlane] = useContext(SwimlaneContext);
  const [filterProjectIds, setFilterProjectIds] = useContext(
    FilterProjectIdsContext
  );
  const [filterMilestoneTitles, setFilterMilestoneTitles] = useContext(
    FilterMilestoneTitlesContext
  );
  const [filterStoryTitles, setFilterStoryTitles] = useContext(
    FilterStoryTitlesContext
  );

  // These are the filters that are selected in Settings
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

  // The actual filters are updated to the selected filters
  // This is called when Get issues button is clicked
  const setFilters = () => {
    setSwimlane(selectedSwimlane);
    setFilterProjectIds([...selectedProjectIds]);
    setFilterMilestoneTitles([...selectedMilestoneTitles]);
    setFilterStoryTitles([...selectedStoryTitles]);
  };

  // While no project is selected "Get issues" button is disabled
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
              selectedSwimlane={selectedSwimlane}
              setSelectedSwimlane={setSelectedSwimlane}
            />
          </div>
          <div className="text-right">Story</div>
        </FilterBox>

        <Subtitle>PROJECTS</Subtitle>
        <FilterBox>
          <ScrollableBox>
            <ProjectLabels
              selectedProjectIds={selectedProjectIds}
              setSelectedProjectIds={setSelectedProjectIds}
            />
          </ScrollableBox>
        </FilterBox>

        <Subtitle>STORIES</Subtitle>
        <FilterBox>
          <ScrollableBox>
            <StoryLabels
              selectedProjectIds={selectedProjectIds}
              selectedStoryTitles={selectedStoryTitles}
              setSelectedStoryTitles={setSelectedStoryTitles}
            />
          </ScrollableBox>
        </FilterBox>

        <Subtitle>MILESTONE</Subtitle>
        <FilterBox>
          <MilestoneDropDown
            selectedProjectIds={selectedProjectIds}
            setSelectedMilestoneTitles={setSelectedMilestoneTitles}
          />
        </FilterBox>

        <div className="w-100 d-flex justify-content-center mb-4 mt-4">
          <button
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
