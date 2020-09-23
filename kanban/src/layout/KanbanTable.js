import React from "react";

function KanbanTable() {
  return (
    <React.Fragment>
      <div className="container-fluid p-3">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>First</th>
                <th>Second</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Otto</th>
                <td>Issue</td>
                <td>Issue</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default KanbanTable;
