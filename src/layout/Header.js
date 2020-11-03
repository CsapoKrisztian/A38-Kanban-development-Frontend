import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavButtons = styled.div`
  width: 100px;
`;

const NavButton = styled.div`
  cursor: pointer;
`;

/**
 * Navigation bar
 * @param {*} props.toggleOpened opens the side bar and pushes the Main component
 */
function Header(props) {
  return (
    <React.Fragment>
      <nav className="navbar sticky-top navbar-expand-lg navbar-success bg-success">
        <Link
          className="navbar-brand text-white"
          to="/"
          // Logo, which redirect to the main route
        >
          <b>Kanban</b>Sync
        </Link>


          <div className="col p-1 text-white">
            <NavButton
              onClick={props.toggleOpened}
              // Opens the sidebar with filter settings
            >
              <i className="fas fa-cogs" style={{float: "right", paddingRight: "1%"}}></i>
            </NavButton>
          </div>

      </nav>
    </React.Fragment>
  );
}

export default Header;
