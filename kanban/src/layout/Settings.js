import React from "react";
import styled from "styled-components";
import ToggleSwitch from "../styled_components/ToggleSwitch";

const SideMenu = styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 60px;
  right: 0;
  background-color: #202b2d;
  overflow-x: hidden;
  transition: 0.3s;
  padding-top: 50px;
`;
const Subtitle = styled.div`
  margin: 5px 0px 5px 0px;
  padding: 0 15px 0 15px;
  overflow-x: hidden;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: left;
  color: #888;
  text-transform: uppercase;
  width: 100%;
  border-bottom: 1px solid #888;
`;

const FilterBox = styled.div`
  color: white;
  font-size: 16px;
  margin: 10px 15px 40px 15px;
`;

const ScrollableBox = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 200px;
  padding-right: 5px;
`;

const Label = styled.div`
  margin: 0px 6px 0px 0px !important;
  max-width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

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
          <div className="text-right">Project</div>
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

        <Subtitle>STORIES</Subtitle>
        <FilterBox className="">
          <ScrollableBox>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">
              StoryLongerTitle
            </Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>

            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">
              StoryLongLongSuperDuperLongTitle
            </Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
            <Label className="badge badge-secondary p-2">Story</Label>
          </ScrollableBox>
        </FilterBox>

        <Subtitle>Projects</Subtitle>
        <FilterBox className="">
          <ScrollableBox>
            <Label className="badge badge-info p-2">Project</Label>
            <Label className="badge badge-info p-2">Project</Label>
            <Label className="badge badge-info p-2">ProjectLongTitle</Label>
            <Label className="badge badge-info p-2">Project</Label>
            <Label className="badge badge-info p-2">
              ProjectLongLongSuperDuperLongTitle
            </Label>
            <Label className="badge badge-info p-2">Project</Label>
            <Label className="badge badge-info p-2">Project</Label>
          </ScrollableBox>
        </FilterBox>
      </SideMenu>
    </React.Fragment>
  );
}

export default Settings;
