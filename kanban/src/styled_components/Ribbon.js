import styled from "styled-components";

const Ribbon = styled.span`
  background: #8e44ad;
  color: white;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  padding: 0 20px 0 20px;
  position: relative;
  margin: 5px 10px 0 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;
  min-width: 70px !important;
  max-width: 100%;
  overflow: hidden;

  &:after {
    background: #fff;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #8e44ad;
    border-top: 10px solid transparent;
    content: "";
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export default Ribbon;
