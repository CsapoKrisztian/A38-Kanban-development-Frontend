import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 5px;
  font-size: 12px;
  white-space: normal !important;
`;

const MilestoneBox = styled.div`
  text-align: left;
  overflow: hidden;
  direction: ltr;
  width: 100%;
`;

function Card() {
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
        <div className="body">Title</div>
        <div></div>
      </Container>
    </React.Fragment>
  );
}

export default Card;
