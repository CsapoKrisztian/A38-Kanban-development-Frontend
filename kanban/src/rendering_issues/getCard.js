import React from "react";
import Card from "../components/card_components/Card";

/**
 * Returns Card component if the card is at the right column
 * @param {*} issue
 * @param {*} status
 * @param {*} index
 */
export const getCard = (issue, status, index) => {
  if (issue.status.title === status) {
    return (
      <React.Fragment key={issue.id}>
        <Card issue={issue} index={index} />
      </React.Fragment>
    );
  }
};
