import React, { useContext } from "react";
import styled from "styled-components";
import { FilterContext } from "../context/FilterContext";
import RenderIssues from "../styled_components/RenderIssues";

const ScrollWrapper = styled.div`
  white-space: nowrap;
  overflow-x: auto;
`;

function KanbanTable(props) {
  let { statuses } = props;
  const [
    swimlane,
    setSwimlane,
    projectIds,
    setProjectIds,
    milestoneTitles,
    setMilestoneTitles,
    storyTitles,
    setStoryTitles,
  ] = useContext(FilterContext);

  let tableBody = <tr></tr>;

  if (projectIds && milestoneTitles && storyTitles) {
    tableBody = <RenderIssues statuses={statuses} />;
  }

  return (
    <React.Fragment>
      <ScrollWrapper>
        <div className="container-fluid pt-9 pl-3 pr-3 pb-3">
          <div className="table-responsive-sm">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th className="col"></th>
                  {statuses.map((status, index) => (
                    <th key={index} className="col">
                      {status}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{tableBody}</tbody>
            </table>
          </div>
        </div>
      </ScrollWrapper>
    </React.Fragment>
  );
}

export default KanbanTable;
