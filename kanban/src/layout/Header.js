import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAuthorizationCodeUrl } from "../context/Urls";

const NavLinks = styled.div`
  width: 100px;
`;

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";
}

function Header() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-success bg-success">
        <Link className="navbar-brand text-white" to="/">
          <b>Kanban</b>Sync
        </Link>
        <button onClick={() => (window.location = getAuthorizationCodeUrl)}>
          Login
        </button>
        <ul className="navbar-nav mr-auto"></ul>
        <NavLinks className="row pr-1">
          <Link className="text-white" to="(logout or user page)">
            <div className="col p-2">
              <i className="fas fa-power-off"></i>
            </div>
          </Link>
          <div className="col p-2 text-white">
            <button onClick={openNav}>
              <i className="fas fa-cogs"></i>
            </button>
          </div>
        </NavLinks>
      </nav>
    </React.Fragment>
  );
}

export default Header;
