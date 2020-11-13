import React, { useState, useContext } from 'react';

import Header from './Header';
import Board from './Board';
import Settings from './Settings';

import { SwimlaneContext } from '../context/SwimlaneContext';
import { FilterProjectIdsContext } from '../context/FilterProjectIdsContext';
import { FilterMilestoneTitlesContext } from '../context/FilterMilestoneTitlesContext';
import { FilterStoryTitlesContext } from '../context/FilterStoryTitlesContext';
import useApiCall from '../hooks/useApiCall';

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
  const [swimlane, setSwimlane] = useContext(SwimlaneContext);
  const [filterProjectIds, setFilterProjectIds] = useContext(
    FilterProjectIdsContext
  );
  const [filterMilestoneTitles, setFilterMilestoneTitles] = useContext(
    FilterMilestoneTitlesContext
  );
  const [filterStoryTitles, setFilterStoryTitles] = useContext(
    FilterStoryTitlesContext
  );

  let urlGetIssues =
    swimlane === 'ASSIGNEE'
      ? process.env['REACT_APP_SERVER_ISSUES_BY_ASSIGNEE']
      : process.env['REACT_APP_SERVER_ISSUES_BY_STORY'];

  const [
    objectIssuesMap,
    objectIssuesMapIsLoading,
    setObjectIssuesMap,
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
          objectIssuesMap={objectIssuesMap}
          objectIssuesMapIsLoading={objectIssuesMapIsLoading}
          setObjectIssuesMap={setObjectIssuesMap}
        />
      </div>
      <Settings
        // Apply 'openedStyle' CSS class if the sidebar is opened,
        // and 'closedStyle' if it is closed.
        currentStyle={settingsOpen ? openedStyle : closedStyle}
        swimlane={swimlane}
        setSwimlane={setSwimlane}
        filterProjectIds={filterProjectIds}
        setFilterProjectIds={setFilterProjectIds}
        filterMilestoneTitles={filterMilestoneTitles}
        setFilterMilestoneTitles={setFilterMilestoneTitles}
        filterStoryTitles={filterStoryTitles}
        setFilterStoryTitles={setFilterStoryTitles}
      />
    </React.Fragment>
  );
};

export default Main;
