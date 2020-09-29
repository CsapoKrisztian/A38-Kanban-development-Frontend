import styled from "styled-components";

export const CircleButton = styled.div`
  width: 30px;
  text-align: center;
  position: relative;
  padding-bottom: 30px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.03);
`;

export const CircleImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
`;

export const CircleText = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  margin: 0;
  padding: 0;
  font-size: 6vw;
`;
