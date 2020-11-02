import styled from "styled-components";

/**
 * Looks like text but it behaves like a button
 */
const TextAsButton = styled.button`
  border: 0;
  padding: 0;
  background-color: white;
  &:focus {
    outline: 0;
  }
`;

export default TextAsButton;
