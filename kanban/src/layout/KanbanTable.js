import React from "react";
import Cell from "../styled_components/Cell";

function KanbanTable(props) {
  let { statuses } = props;

  return (
    <React.Fragment>
      <div className="container-fluid pt-9 pl-3 pr-3 pb-3">
        <div className="table-responsive-sm">
          <table className="table table-sm">
            <thead>
              <tr>
                <th className="col"></th>
                {statuses.map((status) => (
                  <th key="" className="col ">
                    <Cell>{status}</Cell>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="col">
                  <Cell></Cell>
                </th>
                <th className="col">
                  <Cell></Cell>
                </th>
                <th className="col">
                  <Cell></Cell>
                </th>
                <th className="col">
                  <Cell></Cell>
                </th>
                <th className="col">
                  <Cell></Cell>
                </th>
                <th className="col">
                  <Cell></Cell>
                </th>
                <th className="col">
                  <Cell></Cell>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default KanbanTable;
