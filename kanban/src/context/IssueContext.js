import React, { createContext, useState } from "react";

export const IssueContext = createContext();

export const IssueProvider = (props) => {
  const [issuesByStory, setIssuesByStory] = useState([]);
  const [issuesByStoryAreLoaded, setIssuesByStoryAreLoaded] = useState(false);
  const [issuesByUser, setIssuesByUser] = useState([]);
  const [issuesByUserAreLoaded, setIssuesByUserAreLoaded] = useState(false);

  return (
    <IssueContext.Provider
      value={{
        issuesByStory,
        setIssuesByStory,
        issuesByStoryAreLoaded,
        setIssuesByStoryAreLoaded,
        issuesByUser,
        setIssuesByUser,
        issuesByUserAreLoaded,
        setIssuesByUserAreLoaded,
      }}
    >
      {props.children}
    </IssueContext.Provider>
  );
};
