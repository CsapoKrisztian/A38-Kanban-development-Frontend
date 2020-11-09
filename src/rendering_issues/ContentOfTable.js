import React from 'react';
import styled from 'styled-components';

import { Row } from './Row';
import { FirstCellOfRow } from './FirstCellOfRow';

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
export const ContentOfTable = ({ objectIssuesList, swimlane }) => {
  // Value of storyIdOfDraggedIssue will be the story id of the dragged issue.
  // The story id of the destination cell should be the same, because the story shouldn't change

  return objectIssuesList.map((objectIssues, index) => (
    <tr key={index}>
      <FirstCell>
        <div className="mt-4 pt-2 mb-4 pb-2 text-center">
          {FirstCellOfRow(objectIssues, swimlane)}
        </div>
      </FirstCell>

      <Row objectIssues={objectIssues} />
    </tr>
  ));
};
