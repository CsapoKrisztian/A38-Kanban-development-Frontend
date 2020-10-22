import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FilterContext } from "../context/FilterContext";
import RenderIssues from "../rendering_issues/RenderIssues";

const ScrollWrapper = styled.div`
  white-space: nowrap;
  overflow-x: auto;
`;

/**
 * Renders Get issues button and the table
 * At least one project should be selected to request the issues
 * @param {string[]} props: statuses - array of statuses
 */
function KanbanTable(props) {
  let { statuses } = props;
  const [
    projectIds,
    setProjectIds,
    swimlane,
    setSwimlane,
    milestoneTitles,
    setMilestoneTitles,
    storyTitles,
    setStoryTitles,
  ] = useContext(FilterContext);
  const [tableBody, setTableBody] = useState(<tr></tr>);

  /**
   * While no project is selected button is disabled
   */
  let disabled = true;
  if (
    projectIds !== undefined &&
    projectIds !== null &&
    projectIds.length > 0
  ) {
    disabled = false;
  }

  /**
   * When Get issues is clicked the table rows are rendered
   */
  const getIssues = () => {
    if (
      projectIds !== undefined &&
      projectIds !== null &&
      projectIds.length > 0 &&
      milestoneTitles &&
      storyTitles
    ) {
      let issuesInTable = (
        <RenderIssues
          statuses={[...statuses]}
          swimlane={swimlane}
          projectIds={[...projectIds]}
          milestoneTitles={[...milestoneTitles]}
          storyTitles={[...storyTitles]}
        />
      );

      setTableBody(issuesInTable);
    }
  };

  return (
    <React.Fragment>
      <div className="w-100 d-flex justify-content-center mb-4 mt-4">
        <button // Get issues button
          type="button"
          disabled={disabled}
          className="btn btn-success"
          onClick={() => getIssues()}
        >
          Get issues
        </button>
      </div>
      <ScrollWrapper>
        <div className="container-fluid pt-9 pl-3 pr-3 pb-3">
          <div className="table-responsive-sm">
            <table className="table table-sm" id="board">
              <thead
              // Table header with the statuses
              >
                <tr>
                  <th className="col"></th>
                  {statuses.map((status, index) => (
                    <th key={index} className="col">
                      {status}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
              // Table body is returned by RenderIssues
              >
                {tableBody}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollWrapper>
    </React.Fragment>
  );
}

export default KanbanTable;
