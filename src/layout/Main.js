import React, { useState, useContext } from 'react';

import Header from './Header';
import Board from './Board';
import Settings from './Settings';
import useApiCall from '../hooks/useApiCall';

import { SwimlaneContext } from '../context/SwimlaneContext';
import { FilterProjectIdsContext } from '../context/FilterProjectIdsContext';
import { FilterMilestoneTitlesContext } from '../context/FilterMilestoneTitlesContext';
import { FilterStoryTitlesContext } from '../context/FilterStoryTitlesContext';

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
  const [swimlane] = useContext(SwimlaneContext);
  const [filterProjectIds] = useContext(FilterProjectIdsContext);
  const [filterMilestoneTitles] = useContext(FilterMilestoneTitlesContext);
  const [filterStoryTitles] = useContext(FilterStoryTitlesContext);

  let urlGetIssues =
    swimlane === 'STORY'
      ? process.env['REACT_APP_SERVER_ISSUES_BY_STORY']
      : process.env['REACT_APP_SERVER_ISSUES_BY_ASSIGNEE'];

  const [
    objectIssuesList,
    objectIssuesListIsLoading,
    setObjectIssuesList,
    loadDataFromBackend,
  ] = useApiCall(
    `${process.env['REACT_APP_SERVER']}${urlGetIssues}`,
    'POST',
    filterProjectIds,
    filterMilestoneTitles,
    filterStoryTitles
  );

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
        // Apply 'pushedStyle' CSS class if the sidebar is opened,
        // and 'expandedStyle' if it is closed.
        style={settingsOpen ? pushedStyle : expandedStyle}
      >
        <Board
          objectIssuesList={objectIssuesList}
          objectIssuesListIsLoading={objectIssuesListIsLoading}
          setObjectIssuesList={setObjectIssuesList}
        />
      </div>
      <Settings
        // Apply 'openedStyle' CSS class if the sidebar is opened,
        // and 'closedStyle' if it is closed.
        currentStyle={settingsOpen ? openedStyle : closedStyle}
        toggleOpened={toggleOpened}
        loadDataFromBackend={loadDataFromBackend}
      />
    </React.Fragment>
  );
};

export default Main;
