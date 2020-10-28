import React, { useState } from "react";
import styled from "styled-components";
import Container from "./Container";
import { Draggable } from "react-beautiful-dnd";
import { getPriorityBox } from "./getPriorityBox";
import { getStoryRibbon } from "./getStoryRibbon";
import { getGitlabLogoBox } from "./getGitlabLogoBox";
import { getAssigneeBox } from "./getAssigneeBox";
import { getDueDateBox } from "./getDueDateBox";
import { getNotesCounterBox } from "./getNotesCounterBox";
import { getOtherLabelsBox } from "./getOtherLabelsBox";
import { updateAssignee } from "../../service/updateAssignee";
import { updateStatus } from "../../service/updateStatus";

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

/**
 * Renders a card
 * @param {*} props
 */
const Card = (props) => {
  let {
    assignee,
    dueDate,
    webUrl,
    mileStone,
    priority,
    project,
    reference,
    story,
    title,
    userNotesCount,
  } = props.issue;

  mileStone = mileStone != null ? mileStone.title : " ";
  title = title != null ? title : "No title";

  return (
      <Draggable
        draggableId={props.issue.id}
        key={props.issue.id}
        index={props.index}
      >
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="card"
            id={props.issue.id}
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
}

export default Card;
