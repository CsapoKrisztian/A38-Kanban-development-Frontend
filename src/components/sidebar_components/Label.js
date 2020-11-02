import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FilterContext } from "../../context/FilterContext";

const LabelStyle = styled.button`
  background-color: ${(props) => (props.bg ? props.bg : "#17a2b8")};
  &:hover {
    filter: brightness(125%);
  }
  border: none;
  margin: 0px 6px 6px 0px !important;
  padding: 5px 10px;
  max-width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
  color: white;
  &:focus {
    outline: 0;
  }
`;

/**
 * Project and story labels will be stored in FilterContext
 * after clicking on them. Clicking on an active label, removes
 * the label from the context.
 * @param {*} props
 */
function Label(props) {
  const offBgColor = "#6c757d";
  const [
    projectIds,
    setProjectIds,
    swimlane,
    setSwimlane,
    milestoneTitles,
    setMilestoneTitles,
    storyTitles
  ] = useContext(FilterContext);

  const [bgColor, setBgColor] = useState(offBgColor);

  const selectLabel = () => {
    setBgColor(props.color);
    props.addFilter();
  };

  const deselectLabel = () => {
    setBgColor(offBgColor);
    props.deleteFilter();
  };

  useEffect(() => {
    if (props.projectId !== null && props.projectId !== undefined) {
      let savedProjectIdsString = localStorage.getItem("projectIds");
      if (savedProjectIdsString !== null && savedProjectIdsString.includes(props.projectId)) {
        setBgColor(props.color);
      }
    } else  {
      let savedStoryTitlesString = localStorage.getItem("storyTitles");
      if (savedStoryTitlesString !== null && savedStoryTitlesString.includes(props.title)) {
        setBgColor(props.color);
      }
    }
  }, [props.color, props.projectId, props.title]);
  

  const handleClick = () => {
    if (props.projectId !== null && props.projectId !== undefined) {
      if (projectIds.indexOf(props.projectId) < 0) {
        selectLabel();
        } else {
          deselectLabel();
        }
    } else {
      if (storyTitles.indexOf(props.title) < 0) {
        selectLabel();
      } else {
        deselectLabel();
      }
    }
  };
  return (
      <LabelStyle bg={bgColor} type="button" onClick={() => handleClick()}>
        {props.title}
      </LabelStyle>
  );
}

export default Label;
