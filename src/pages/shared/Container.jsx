import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 147px);
  height: ${({ marginTop }) => (marginTop ? `calc(100vh - ${marginTop + 147}px)` : 'calc(100vh - 147px)')};
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop + 147}px` : '147px')};
  color: #686868;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Container;
