import React from "react";
import styled from "styled-components";
import Ribbon from "./Ribbon";
import { CircleButton, CircleImg, CircleText } from "./Circle";

const Container = styled.div`
  margin-bottom: 5px;
  font-size: 12px;
  white-space: normal !important;
  text-align: left;
`;

const MilestoneBox = styled.div`
  text-align: left;
  overflow: hidden;
  direction: ltr;
  width: 100%;
`;

const Information = styled.span`
  font-size: 10px;
  color: gray;
`;

const Footer = styled.div`
  font-size: 14px;
  color: gray;
`;

function Card(issue) {
  let {
    assignee,
    dueDate,
    issueId,
    issueUrl,
    milestone,
    priority,
    project,
    reference,
    story,
    title,
    userNotesCount,
  } = issue;
  return (
    <React.Fragment>
      <Container className="card">
        <div className="card-header p-0 text-left d-flex justify-content-end align-items-center">
          <MilestoneBox className="p-2">Milestone</MilestoneBox>
          <div className="text-center pt-2 pr-2">
            <h6 className="align-self-center">
              <span className="badge badge-danger p-2">P0</span>
            </h6>
          </div>
        </div>

        <div className="body">
          <div className="pr-3">
            <Ribbon>Story</Ribbon>
          </div>
          <div className="pl-2 pr-2">
            <Information>
              <i className="far fa-calendar-alt"></i> 2020-09-15
            </Information>
            <h6 className="mt-1 mb-1">This is the title of the issue</h6>
            <Information>Project</Information>
            <Footer className="row mt-1">
              <div className="col text-left d-flex align-items-center">
                <i className="far fa-comments"></i>
                <Information className="ml-1">83</Information>
              </div>
              <div className="col text-center d-flex align-items-center justify-content-center">
                <i className="fab fa-gitlab"></i>
              </div>
              <div className="col text-right d-flex justify-content-end">
                <CircleButton>
                  <CircleImg src="http://www.placekitten.com/300/320" alt="" />
                </CircleButton>
              </div>
            </Footer>
          </div>
        </div>
        <div></div>
      </Container>
    </React.Fragment>
  );
}

export default Card;
