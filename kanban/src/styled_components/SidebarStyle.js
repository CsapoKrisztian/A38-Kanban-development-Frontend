import styled from "styled-components";

export const SideMenu = styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 60px;
  right: 0;
  background-color: #202b2d;
  overflow-x: hidden;
  overflow-y: auto;
  transition: 0.3s;
`;

export const Subtitle = styled.div`
  margin: 5px 0px 5px 0px;
  padding: 0 15px 0 15px;
  overflow-x: hidden;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: left;
  color: #888;
  text-transform: uppercase;
  width: 100%;
  border-bottom: 1px solid #888;
`;

export const FilterBox = styled.div`
  color: white;
  font-size: 16px;
  margin: 10px 15px 40px 15px;
`;

export const ScrollableBox = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 200px;
  padding-right: 5px;
`;

export const Wrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 100%;
  padding-bottom: 50px;
  padding-top: 50px;
`;
