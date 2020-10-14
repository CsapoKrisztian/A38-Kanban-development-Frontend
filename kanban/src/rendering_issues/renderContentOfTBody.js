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
 * @param {*} issues
 * @param {string[]} statuses
 * @param {string} swimlane
 * @param {string} storyOfDraggedIssue
 */
export const renderContentOfTBody = (
  issues,
  statuses,
  swimlane,
  storyOfDraggedIssue
) => {
  return issues.map((item, index) => (
    <tr key={index}>
      <FirstCell>
        <div className="mt-4 pt-2 mb-4 pb-2 text-center">
          {renderFirstCellOfRow(item, swimlane)}
        </div>
      </FirstCell>

      {renderRow(
        statuses,
        item.issues,
        getAlphaNumeric(
          swimlane === "STORY"
            ? item.story.title
            : item.assignee !== null
            ? item.assignee.name
            : "Unassigned"
        ),
        swimlane === "STORY" && storyOfDraggedIssue !== item.story.title
          ? true
          : false
      )}
    </tr>
  ));
};
