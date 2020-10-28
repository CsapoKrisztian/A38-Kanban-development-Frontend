import React from "react";
import styled from "styled-components";
import { getAlphaNumeric } from "../util/getAlphaNumeric";
import { renderRow } from "./renderRow";
import { renderFirstCellOfRow } from "./renderFirstCellOfRow";

const FirstCell = styled.td`
  min-height: 100px !important;
`;

/**
 * The first cell in the row is rendered depending on the swimlane
 * and after that the issues ordered in status columns.
 * Stories shouldn't change, so if the dragged issue's story
 * is different than the destination cell then dropping will be
 * disabled.
 * @see renderRow
 * @param {*} objectIssuesList
 * @param {string[]} statuses
 * @param {string} swimlane
 * @param {string} storyIdOfDraggedIssue
 */
export const renderContentOfTBody = (
  objectIssuesList,
  statuses,
  swimlane,
  storyIdOfDraggedIssue
) => {
  return objectIssuesList.map((objectIssues, index) => (
    <tr key={index}>
      <FirstCell>
        <div className="mt-4 pt-2 mb-4 pb-2 text-center">
          {renderFirstCellOfRow(objectIssues, swimlane)}
        </div>
      </FirstCell>

      {renderRow(
        statuses,
        objectIssues.issues,
        getAlphaNumeric(
          swimlane === "STORY" ?
            objectIssues.story !== null ?
              objectIssues.story.id : "Without story"
          : objectIssues.assignee !== null ?
            objectIssues.assignee.name : "Unassigned"
        ),
        swimlane === "STORY" ?
          objectIssues.story !== null ?
            storyIdOfDraggedIssue !== objectIssues.story.id ?
              true : false
          : storyIdOfDraggedIssue !== '' ?
              true : false
        : false
      )}
    </tr>
  ));
};
