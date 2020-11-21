import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Container from '../components/card_components/Container';
import { getPriorityBox } from '../components/card_components/getPriorityBox';
import { getStoryRibbon } from '../components/card_components/getStoryRibbon';
import { getGitlabLogoBox } from '../components/card_components/getGitlabLogoBox';
import { getAssigneeBox } from '../components/card_components/getAssigneeBox';
import { getDueDateBox } from '../components/card_components/getDueDateBox';
import { getNotesCounterBox } from '../components/card_components/getNotesCounterBox';
import { getOtherLabelsBox } from '../components/card_components/getOtherLabelsBox';

const MilestoneBox = styled.div`
  text-align: left;
  overflow: hidden;
  direction: ltr;
  width: 100%;
`;

const Footer = styled.div`
  font-size: 14px;
  color: gray;
  height: 36px;
`;

export const IssueCard = ({ issue, index }) => {
  let {
    id,
    title,
    assignee,
    project,
    mileStone,
    story,
    priority,
    webUrl,
    dueDate,
    reference,
    userNotesCount,
  } = issue;

  mileStone = mileStone != null ? mileStone.title : ' ';
  title = title != null ? title : 'No title';

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="card"
          id={id}
        >
          <div className="card-header p-0 text-left d-flex justify-content-end align-items-center">
            <MilestoneBox className="p-2">{mileStone}</MilestoneBox>
            {getAssigneeBox(assignee)}
          </div>

          <div>
            {getStoryRibbon(story)}

            <div className="pl-2 pr-2">
              {getDueDateBox(dueDate)}
              <h6 className="mt-1 mb-1">{title}</h6>
              {getOtherLabelsBox(project, reference)}

              <Footer className="row mt-1">
                {getNotesCounterBox(userNotesCount)}
                {getGitlabLogoBox(webUrl)}
                {getPriorityBox(priority)}
              </Footer>
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  );
};
