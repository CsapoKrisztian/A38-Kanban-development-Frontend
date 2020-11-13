import React, { useState } from 'react';

import Header from './Header';
import Board from './Board';
import Settings from './Settings';

const openedStyle = {
  width: '250px',
};

const closedStyle = {
  width: 0,
};

const pushedStyle = {
  marginRight: '250px',
};

const expandedStyle = {
  marginRight: 0,
};

/**
 * Responsible for pushing Board (the main part with the
 * Get issues button and the table) when Settings (sidebar) is opened
 */
const Main = () => {
  const getSettingsOpenedFromLocalStorage = () => {
    let savedSettingsOpen = localStorage.getItem('settingsOpen');
    return savedSettingsOpen === 'true' ? true : false;
  };

  const [settingsOpen, setSettingsOpen] = useState(
    getSettingsOpenedFromLocalStorage()
  );

  // Toggle opening of the sidebar
  const toggleOpened = () => {
    const newSettingsOpen = !settingsOpen;
    setSettingsOpen(newSettingsOpen);
    localStorage.setItem('settingsOpen', newSettingsOpen);
  };

  return (
    <React.Fragment>
      <Header toggleOpened={toggleOpened} />
      <div
        id="main"
        // Apply 'pushedStyle' CSS class if the sidebar is opened, and 'expandedStyle' if it is closed.
        style={settingsOpen ? pushedStyle : expandedStyle}
      >
        <Board />
      </div>
      <Settings
        // Apply 'openedStyle' CSS class if the sidebar is opened, 'closedStyle' if it is closed.
        currentStyle={settingsOpen ? openedStyle : closedStyle}
      />
    </React.Fragment>
  );
};

export default Main;
