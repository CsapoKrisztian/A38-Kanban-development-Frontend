import React from "react";
import Card from "../styled_components/Card";
import styled from "styled-components";

const ScrollWrapper = styled.div`
  white-space: nowrap;
  overflow-x: auto;
`;

const getAlphaNumeric = (str) => {
  if (str === "" || str === undefined) return "";
  return str.replace(/[\W_]+/g, "");
};

/*const placeIssue = (issue, swimlaneClassName, statusClassName) => {
  let cell = document.querySelector(`.${statusClassName}.${swimlaneClassName}`);
  if (cell) {
    cell.appendChild(<Card />);
  }
};*/
const getCard = (issue, status) => {
  if (issue.status.title === status) {
    console.log(issue.status.title);
    return <Card />;
  }
};

const renderRow = (statuses, issues, swimlaneClassName) => {
  return statuses.map((status) => (
    <td className={`col ${swimlaneClassName} ${getAlphaNumeric(status)}`}>
      {issues.map((issue) => getCard(issue, status))}
    </td>
  ));
};

/*const renderIssues = (item) => {
  return item.issues.map((issue) =>
    placeIssue(
      issue,
      getAlphaNumeric(item.story.title),
      getAlphaNumeric(issue.status.title)
    )
  );
};*/

const getContentOfFirstCellInRow = (item, swimlane) => {
  if (swimlane === "STORY") {
    return item.story.title;
  }

  let user = ""; //TODO
  return user;
};

const renderContentOfTBody = (issues, statuses, swimlane) => {
  return issues.map((item, index) => (
    <tr key={index}>
      <th className="col">{getContentOfFirstCellInRow(item, swimlane)}</th>
      {renderRow(statuses, item.issues, getAlphaNumeric(item.story.title))}
    </tr>
  ));
};

function KanbanTable(props) {
  let { statuses, issues } = props;
  let swimlane = "STORY";

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
              <tbody>{renderContentOfTBody(issues, statuses, swimlane)}</tbody>
            </table>
          </div>
        </div>
      </ScrollWrapper>
    </React.Fragment>
  );
}

export default KanbanTable;
