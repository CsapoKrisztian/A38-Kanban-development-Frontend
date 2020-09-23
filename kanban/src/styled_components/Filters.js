import React from "react";
import styled from "styled-components";

const FilterStyle = styled.div`
  color: #767676;
  font-size: small;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20 px;
  align-content: left;
  text-align: left;
`;

function Filters(props) {
  const { projects, milestone } = props;

  let projectFilter = " ";
  if (projects && projects !== undefined) {
    let projectNames = projects.join(", ");
    projectFilter = `Projects: ${projectNames}`;
  }

  return (
    <React.Fragment>
      <FilterStyle>
        {projectFilter} | Milestone: {milestone}
      </FilterStyle>
    </React.Fragment>
  );
}

export default Filters;
