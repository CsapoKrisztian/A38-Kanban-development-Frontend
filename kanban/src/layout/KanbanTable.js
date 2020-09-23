import React from "react";
import Cell from "../styled_components/Cell";

function KanbanTable(props) {
  let { statuses } = props;

  return (
    <React.Fragment>
      <div className="container-fluid p-3">
        <div className="table-responsive-sm">
          <table className="table table-sm">
            <thead>
              <tr>
                <th className="col-sm-1"></th>
                {statuses.map((status) => (
                  <th className="col-sm-1">
                    <Cell>{status}</Cell>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="col-sm-1">
                  <Cell></Cell>
                </th>
                <th className="col-sm-1">
                  <Cell>
                    Ottoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                  </Cell>
                </th>
                <th className="col-sm-1">
                  <Cell></Cell>
                </th>
                <th className="col-sm-1">
                  <Cell></Cell>
                </th>
                <th className="col-sm-1">
                  <Cell></Cell>
                </th>
                <th className="col-sm-1">
                  <Cell></Cell>
                </th>
                <th className="col-sm-1">
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
