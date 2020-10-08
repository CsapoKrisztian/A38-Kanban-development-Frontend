import styled from "styled-components";

export const CircleButton = styled.div`
  width: ${(props) => (props.size ? props.size : "30px")};
  text-align: center;
  position: relative;
  padding-bottom: ${(props) => (props.size ? props.size : "30px")};
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
