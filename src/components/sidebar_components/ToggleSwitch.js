import React from 'react';
import styled from 'styled-components';

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #17a2b8;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    background-color: white;
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

// Choose between story and assignee swimlanes by toggling this switch
function ToggleSwitch({ selectedSwimlane, setSelectedSwimlane }) {
  const toggleSwimlane = () => {
    let newSwimlane = selectedSwimlane === 'STORY' ? 'ASSIGNEE' : 'STORY';
    setSelectedSwimlane(newSwimlane);
    localStorage.setItem('swimlane', newSwimlane);
  };

  return (
    <SwitchLabel>
      <SwitchInput
        type="checkbox"
        checked={selectedSwimlane === 'STORY' ? true : false}
        onChange={toggleSwimlane}
      />
      <SwitchSlider className="slider" />
    </SwitchLabel>
  );
}

export default ToggleSwitch;
