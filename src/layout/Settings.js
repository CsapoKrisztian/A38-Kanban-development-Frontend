import React, { useContext } from 'react';
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
import { FilterProjectIdsContext } from '../context/FilterProjectIdsContext';

/**
 * Renders the sidebar for filter settings
 * @param {*} props: currentStyle - the sidebar is opened or closed
 */
const Settings = ({ currentStyle, toggleOpened, loadDataFromBackend }) => {
  const [filterProjectIds] = useContext(FilterProjectIdsContext);

  /**
   * While no project is selected "Get issues" button is disabled
   */
  let disabled =
    filterProjectIds === undefined ||
    filterProjectIds === null ||
    filterProjectIds.length === 0;

  return (
    <SideMenu style={currentStyle} className="sidenav">
      <Wrapper>
        <Subtitle>SWIMLANES</Subtitle>
        <FilterBox className="d-flex justify-content-between">
          <div className="text-left">Assignee</div>
          <div className="text-center">
            <ToggleSwitch />
          </div>
          <div className="text-right">Story</div>
        </FilterBox>

        <Subtitle>PROJECTS</Subtitle>
        <FilterBox>
          <ScrollableBox>
            <ProjectLabels />
          </ScrollableBox>
        </FilterBox>

        <Subtitle>STORIES</Subtitle>
        <FilterBox>
          <ScrollableBox>
            <StorySelector />
          </ScrollableBox>
        </FilterBox>

        <Subtitle>MILESTONE</Subtitle>
        <FilterBox>
          <MilestoneSelector />
        </FilterBox>

        <div className="w-100 d-flex justify-content-center mb-4 mt-4">
          <button // Get issues button
            type="button"
            disabled={disabled}
            className="btn btn-success"
            onClick={loadDataFromBackend}
          >
            Get issues
          </button>
        </div>
      </Wrapper>
    </SideMenu>
  );
};

export default Settings;
