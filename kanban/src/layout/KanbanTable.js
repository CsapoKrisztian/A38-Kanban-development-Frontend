import React from "react";

function KanbanTable(props) {
  let { statuses } = props;

  return (
    <React.Fragment>
      <div className="container-fluid p-3">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th></th>
                {statuses.map((status) => (
                  <th>{status}</th>
                ))}
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
