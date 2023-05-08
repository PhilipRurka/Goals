import styled from 'styled-components';

export const EditPostStyled = styled.div`

`;

export const AbsoluteEdit = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 100px;
  background-color: white;
  overflow-y: scroll;
  transform: translateX(100%);
  box-shadow: 0 0 30px -4px black;
  z-index: 1;
`;