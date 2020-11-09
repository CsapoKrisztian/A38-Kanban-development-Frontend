import { renderStoryBox } from './renderStoryBox';
import { renderAssigneeBox } from './renderAssigneeBox';

/**
 * Content of first cell changes depending on the swimlane filter
 * If issues are unassigned in assignee view then the first cell
 * renders a default picture with "Unassigned" subtitle
 * @param {*} objectIssues
 * @param {string} swimlane
 */
export const FirstCellOfRow = (objectIssues, swimlane) => {
  if (swimlane === 'STORY') {
    let withoutStory = {
      title: 'Without story',
      description: '',
    };
    return objectIssues.story !== null
      ? renderStoryBox(objectIssues.story)
      : renderStoryBox(withoutStory);
  } else {
    let unassigned = {
      name: 'Unassigned',
      avatarUrl: `${process.env['REACT_APP_DEFAULT_AVATAR_IMG']}`,
    };
    return objectIssues.assignee !== null
      ? renderAssigneeBox(objectIssues.assignee)
      : renderAssigneeBox(unassigned);
  }
};
