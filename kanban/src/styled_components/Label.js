import React from "react";
import styled from "styled-components";

const LabelStyle = styled.button`
  margin: 0px 6px 6px 0px !important;
  max-width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
`;

const off = `
background-color: #6c757d;

`;

function Label(props) {
  let style = off;

  return (
    <React.Fragment>
      <LabelStyle type="button">{props.title}</LabelStyle>
    </React.Fragment>
  );
}

export default Label;
