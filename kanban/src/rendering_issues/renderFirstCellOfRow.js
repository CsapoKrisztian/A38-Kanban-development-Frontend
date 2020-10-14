import { renderStoryBox } from "./renderStoryBox";
import { renderAssigneeBox } from "./renderAssigneeBox";

/**
 * Content of first cell changes depending on the swimlane filter
 * If issues are unassigned in assignee view then the first cell
 * renders a default picture with "Unassigned" subtitle
 * @param {*} item
 * @param {string} swimlane
 */
export const renderFirstCellOfRow = (item, swimlane) => {
  if (swimlane === "STORY") {
    return renderStoryBox(item.story);
  }

  let unassigned = {
    name: "Unassigned",
    avatarUrl: `${process.env["REACT_APP_DEFAULT_AVATAR_IMG"]}`,
  };
  if (item.assignee === null) return renderAssigneeBox(unassigned);
  return renderAssigneeBox(item.assignee);
};
