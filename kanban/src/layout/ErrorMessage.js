import React from "react";
import errorImg from "../images/error.svg";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const ErrorLogo = styled.img`
  width: 150px;
`;

const Message = styled.h3`
  font-size: 30px;
`;

const Container = styled.div`
  position: absolute;
  width: 300px;
  height: 200px;
  top: 50%;
  left: 50%;
  margin: -100px 0 0 -150px;
`;

function ErrorMessage() {
  let { message } = useParams();
  return (
    <React.Fragment>
      <Container className="">
        <ErrorLogo className="img-fluid" src={errorImg} alt="" />
        <br />
        <Message className="text-secondary text-center m-2">{message}</Message>
      </Container>
    </React.Fragment>
  );
}

export default ErrorMessage;
