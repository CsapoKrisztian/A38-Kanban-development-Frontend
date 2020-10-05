import React from "react";
import ToggleSwitch from "../styled_components/ToggleSwitch";
import Label from "../styled_components/Label";
import useApiCall from "../hooks/useApiCall";
import {
  SideMenu,
  Subtitle,
  FilterBox,
  ScrollableBox,
} from "../styled_components/SidebarStyle";

function Settings(props) {
  let projectLabels = "";

  const [projects, projectsAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}/projects`,
    "GET"
  );

  if (!projectsAreLoading && projects) {
    projectLabels = projects.map((project, index) => (
      <Label
        key={index}
        title={
          project.group === null
            ? project.name
            : project.group.name + "/" + project.name
        }
      />
    ));
  }

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
          <ScrollableBox>{projectLabels}</ScrollableBox>
        </FilterBox>

        <Subtitle>STORIES</Subtitle>
        <FilterBox className="">
          <ScrollableBox>
            <Label title="Story" color="#34495E" />
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
