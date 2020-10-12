import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavLinks = styled.div`
  width: 100px;
`;

const NavButton = styled.div`
  cursor: pointer;
`;

function Header(props) {
  return (
    <React.Fragment>
      <nav className="navbar sticky-top navbar-expand-lg navbar-success bg-success">
        <Link className="navbar-brand text-white" to="/">
          <b>Kanban</b>Sync
        </Link>

        <ul className="navbar-nav mr-auto"></ul>
        <NavLinks className="row pr-1">
          <div className="text-white col p-2">
            <NavButton // TODO onClick={logout}
            >
              <i className="fas fa-power-off"></i>
            </NavButton>
          </div>

          <div className="col p-2 text-white">
            <NavButton onClick={props.toggleOpened}>
              <i className="fas fa-cogs"></i>
            </NavButton>
          </div>
        </NavLinks>
      </nav>
    </React.Fragment>
  );
}

export default Header;
