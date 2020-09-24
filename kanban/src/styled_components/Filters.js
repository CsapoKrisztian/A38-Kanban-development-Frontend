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

function showFilters(filterName, labelList) {
  if (labelList && labelList !== undefined) {
    let filterNames = labelList.join(", ");
    return (
      <div>
        <b>{filterName}: </b>
        {filterNames}
      </div>
    );
  }
  return "";
}

function Filters(props) {
  const { stories, projects, milestone } = props;

  let storyFilter = showFilters("Stories", stories);
  let projectFilter = showFilters("Projects", projects);
  let milestoneFilter = showFilters("Milestones", milestone);

  return (
    <React.Fragment>
      <FilterStyle>
        {storyFilter}
        {projectFilter}
        {milestoneFilter}
      </FilterStyle>
    </React.Fragment>
  );
}

export default Filters;
