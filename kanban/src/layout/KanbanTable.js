import React from "react";
import Card from "../styled_components/Card";
import styled from "styled-components";

const ScrollWrapper = styled.div`
  white-space: nowrap;
  overflow-x: auto;
`;

function KanbanTable(props) {
  let { statuses } = props;

  return (
    <React.Fragment>
      <ScrollWrapper>
        <div className="container-fluid pt-9 pl-3 pr-3 pb-3">
          <div className="table-responsive-sm">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th className="col"></th>
                  {statuses.map((status) => (
                    <th key="" className="col">
                      {status}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="col"></th>
                  <th className="col">
                    <Card />
                    <Card />
                  </th>
                  <th className="col"></th>
                  <th className="col"></th>
                  <th className="col"></th>
                  <th className="col"></th>
                  <th className="col"></th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ScrollWrapper>
    </React.Fragment>
  );
}

export default KanbanTable;
