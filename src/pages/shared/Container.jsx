import styled from 'styled-components';

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop + 147}px` : '147px')};
  margin-left: auto;
  margin-right: auto;
  color: #686868;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
`;

export default Container;
