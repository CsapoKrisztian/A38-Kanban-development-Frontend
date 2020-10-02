import React from "react";
import styled from "styled-components";

const SideMenu = styled.div``;

function Settings(props) {
  return (
    <React.Fragment>
      <SideMenu style={props.currentStyle} className="sidenav"></SideMenu>
    </React.Fragment>
  );
}

export default Settings;
