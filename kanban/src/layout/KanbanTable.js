import React from "react";
import styled from "styled-components";

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

  return (
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
                {props.tableBody}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollWrapper>
  );
}

export default KanbanTable;
