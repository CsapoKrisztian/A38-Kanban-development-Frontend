import styled from "styled-components";

/**
 * Makes a link or text gray in any circumstances
 */
const Gray = styled.span`
  color: gray !important;
  &:active,
  &:link,
  &:visited,
  &:hover {
    color: gray !important;
  }
`;

export default Gray;
