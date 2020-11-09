import React, { useContext } from "react";
import Loading from "../components/reuseables/Loading";
import styled from "styled-components";
import { StatusContext } from "../context/StatusContext";

const ScrollWrapper = styled.div`
  white-space: nowrap;
  overflow-x: auto;
`;

/**
 * Fetches statuses and renders KanbanTable
 */
function Board(props) {
  let content = <Loading />;

  const [statuses, statusesAreLoading] = useContext(StatusContext);

  /**
   * While statuses are loading a spinner is rendered
   */
  if (!statusesAreLoading && statuses) {
    content = (
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
  return content;
}

export default Board;
