import React from "react";
import ToggleSwitch from "../components/sidebar_components/ToggleSwitch";
import {
  SideMenu,
  Subtitle,
  FilterBox,
  ScrollableBox,
  Wrapper,
} from "../components/sidebar_components/SidebarStyle";
import ProjectLabels from "../components/sidebar_components/ProjectLabels";
import StorySelector from "../components/sidebar_components/StorySelector";
import MilestoneSelector from "../components/sidebar_components/MilestoneSelector";

/**
 * Renders the sidebar for filter settings
 * @param {*} props: currentStyle - the sidebar is opened or closed
 */
function Settings(props) {
  return (
    <React.Fragment>
      <SideMenu style={props.currentStyle} className="sidenav">
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
        </Wrapper>
      </SideMenu>
    </React.Fragment>
  );
}

export default Settings;
