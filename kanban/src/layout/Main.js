import React, { useState, useContext } from "react";
import Header from "./Header";
import Board from "./Board";
import Settings from "./Settings";
import { FilterContext } from "../context/FilterContext";
import RenderIssues from "../rendering_issues/RenderIssues";
import useApiCall from "../hooks/useApiCall";

const openedStyle = {
  width: "250px",
};

const closedStyle = {
  width: 0,
};

const pushedStyle = {
  marginRight: "250px",
};

const expandedStyle = {
  marginRight: 0,
};

/**
 * Responsible for pushing Board (the main part with the
 * Get issues button and the table) when Settings (sidebar) is opened
 */
function Main() {
  const [opened, setOpened] = useState(false);

  // Toggle opening of the sidebar
  const toggleOpened = () => {
    setOpened((opened) => !opened);
  };

  const [statuses, statusesAreLoading] = useApiCall(
    `${process.env["REACT_APP_SERVER"]}${process.env["REACT_APP_SERVER_STATUSES"]}`,
    "GET"
  );

  const [
    projectIds,
    setProjectIds,
    swimlane,
    setSwimlane,
    milestoneTitles,
    setMilestoneTitles,
    storyTitles,
    setStoryTitles,
  ] = useContext(FilterContext);

  const [tableBody, setTableBody] = useState(<tr></tr>);

  const getIssues = () => {
    if (
      projectIds !== undefined &&
      projectIds !== null &&
      projectIds.length > 0 &&
      milestoneTitles &&
      storyTitles
    ) {
      let issuesInTable = (
        <RenderIssues
          statuses={[...statuses]}
          swimlane={swimlane}
          projectIds={[...projectIds]}
          milestoneTitles={[...milestoneTitles]}
          storyTitles={[...storyTitles]}
        />
      );
      setTableBody(issuesInTable);
    }
  };

  

  return (
    <React.Fragment>
      <Header toggleOpened={toggleOpened} />
      <div
        id="main"
        // Apply 'pushedStyle' CSS class if the sidebar is opened,
        // and 'expandedStyle' if it is closed.
        style={opened ? pushedStyle : expandedStyle}
      >
        <Board tableBody={tableBody}/>
      </div>
      <Settings
        // Apply 'openedStyle' CSS class if the sidebar is opened,
        // and 'closedStyle' if it is closed.
        currentStyle={opened ? openedStyle : closedStyle}
        toggleOpened={toggleOpened}
        getIssues={getIssues}
      />
    </React.Fragment>
  );
}

export default Main;
