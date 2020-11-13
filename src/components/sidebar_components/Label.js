import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LabelStyle = styled.button`
  background-color: ${(props) => (props.bg ? props.bg : '#17a2b8')};
  &:hover {
    filter: brightness(125%);
  }
  border: none;
  margin: 0px 6px 6px 0px !important;
  padding: 5px 10px;
  max-width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
  color: white;
  &:focus {
    outline: 0;
  }
`;

/**
 * Project and story labels will be stored in FilterContext
 * after clicking on them. Clicking on an active label, removes
 * the label from the context.
 * @param {*} props
 */
function Label({
  title,
  projectId,
  color,
  addFilter,
  deleteFilter,
  settingsProjectIds,
  settingsStoryTitles,
}) {
  const offBgColor = '#6c757d';

  const [bgColor, setBgColor] = useState(offBgColor);

  const selectLabel = () => {
    setBgColor(color);
    addFilter();
  };

  const deselectLabel = () => {
    setBgColor(offBgColor);
    deleteFilter();
  };

  useEffect(() => {
    if (projectId !== null && projectId !== undefined) {
      const savedProjectIdsString = localStorage.getItem('projectIds');
      if (
        savedProjectIdsString !== null &&
        savedProjectIdsString.includes(projectId)
      ) {
        setBgColor(color);
      }
    } else {
      const savedStoryTitlesString = localStorage.getItem('storyTitles');
      if (
        savedStoryTitlesString !== null &&
        savedStoryTitlesString.includes(title)
      ) {
        setBgColor(color);
      }
    }
  }, [color, projectId, title]);

  const handleClick = () => {
    if (projectId !== null && projectId !== undefined) {
      if (settingsProjectIds.indexOf(projectId) < 0) {
        selectLabel();
      } else {
        deselectLabel();
      }
    } else {
      if (settingsStoryTitles.indexOf(title) < 0) {
        selectLabel();
      } else {
        deselectLabel();
      }
    }
  };
  return (
    <LabelStyle bg={bgColor} type="button" onClick={() => handleClick()}>
      {title}
    </LabelStyle>
  );
}

export default Label;
