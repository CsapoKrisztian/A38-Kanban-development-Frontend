import React, { useState, useContext } from 'react';

import Header from './Header';
import Board from './Board';
import Settings from './Settings';
import RenderIssues from '../rendering_issues/RenderIssues';

import { SwimlaneContext } from '../context/SwimlaneContext';
import { FilterProjectIdsContext } from '../context/FilterProjectIdsContext';
import { FilterMilestoneTitlesContext } from '../context/FilterMilestoneTitlesContext';
import { FilterStoryTitlesContext } from '../context/FilterStoryTitlesContext';
import { StatusContext } from '../context/StatusContext';

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
function Main() {
  const getSavedOpened = () => {
    let savedSettingsOpen = localStorage.getItem('settingsOpen');
    return savedSettingsOpen === 'true' ? true : false;
  };

  const [settingsOpen, setSettingsOpen] = useState(getSavedOpened());

  // Toggle opening of the sidebar
  const toggleOpened = () => {
    const newSettingsOpen = !settingsOpen;
    setSettingsOpen(newSettingsOpen);
    localStorage.setItem('settingsOpen', newSettingsOpen);
  };

  const [swimlane] = useContext(SwimlaneContext);
  const [filterProjectIds] = useContext(FilterProjectIdsContext);
  const [filterMilestoneTitles] = useContext(FilterMilestoneTitlesContext);
  const [filterStoryTitles] = useContext(FilterStoryTitlesContext);

  const [statuses, statusesAreLoading] = useContext(StatusContext);

  const RenderedIssues = (
    <RenderIssues
      statuses={[...statuses]}
      swimlane={swimlane}
      projectIds={[...filterProjectIds]}
      milestoneTitles={[...filterMilestoneTitles]}
      storyTitles={[...filterStoryTitles]}
    />
  );

  const [tableBody, setTableBody] = useState(RenderedIssues);

  const getIssues = () => {
    if (
      !statusesAreLoading &&
      statuses &&
      filterProjectIds !== undefined &&
      filterProjectIds !== null &&
      filterProjectIds.length > 0 &&
      filterMilestoneTitles &&
      filterStoryTitles
    ) {
      setTableBody(RenderedIssues);
    }
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
        <Board tableBody={tableBody} />
      </div>
      <Settings
        // Apply 'openedStyle' CSS class if the sidebar is opened,
        // and 'closedStyle' if it is closed.
        currentStyle={settingsOpen ? openedStyle : closedStyle}
        toggleOpened={toggleOpened}
        getIssues={getIssues}
      />
    </React.Fragment>
  );
}

export default Main;
