import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FilterContext } from "../../context/FilterContext";

function Label(props) {
  const offBgColor = "#6c757d";
  const [projectIds, setProjectIds] = useContext(FilterContext);
  const [bgColor, setBgColor] = useState(offBgColor);

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

  return (
    <React.Fragment>
      <LabelStyle
        bg={bgColor}
        type="button"
        onClick={() => {
          let newSet = new Set(projectIds);
          if (bgColor === offBgColor) {
            setBgColor(props.color);
            newSet.add(props.projectId);
          } else {
            setBgColor(offBgColor);
            newSet.delete(props.projectId);
          }
          setProjectIds((prevSet) => newSet);
        }}
      >
        {props.title}
      </LabelStyle>
    </React.Fragment>
  );
}

export default Label;
