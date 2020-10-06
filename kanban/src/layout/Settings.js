import React from "react";
import ToggleSwitch from "../styled_components/ToggleSwitch";
import {
  SideMenu,
  Subtitle,
  FilterBox,
  ScrollableBox,
} from "../styled_components/SidebarStyle";
import ProjectLabels from "../styled_components/sidebar_components/ProjectLabels";
import StorySelector from "../styled_components/sidebar_components/StorySelector";

function Settings(props) {
  return (
    <React.Fragment>
      <SideMenu style={props.currentStyle} className="sidenav">
        <Subtitle>SWIMLANES</Subtitle>
        <FilterBox className="d-flex justify-content-between">
          <div className="text-left">Assignee</div>
          <div className="text-center">
            <ToggleSwitch />
          </div>
          <div className="text-right">Story</div>
        </FilterBox>

        <Subtitle>PROJECTS</Subtitle>
        <FilterBox className="">
          <ScrollableBox>
            <ProjectLabels />
          </ScrollableBox>
        </FilterBox>

        <Subtitle>STORIES</Subtitle>
        <FilterBox className="">
          <ScrollableBox>
            <StorySelector />
          </ScrollableBox>
        </FilterBox>

        <Subtitle>MILESTONE</Subtitle>
        <FilterBox className="">
          <select className="custom-select">
            <option defaultValue>Select milestone</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </FilterBox>
      </SideMenu>
    </React.Fragment>
  );
}

export default Settings;
