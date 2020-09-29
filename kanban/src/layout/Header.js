import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAuthorizationCodeUrl } from '../context/Urls';

const NavLinks = styled.div`
  width: 100px;
`;

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
          <Link className="text-white" to="(filter)">
            <div className="col p-2">
              <i className="fas fa-cogs"></i>
            </div>
          </Link>
        </NavLinks>
      </nav>
    </React.Fragment>
  );
}

export default Header;
