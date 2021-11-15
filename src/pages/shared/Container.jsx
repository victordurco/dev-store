import styled from 'styled-components';

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop + 147}px` : '147px')};
  margin-left: auto;
  margin-right: auto;
  min-height: calc(100vh - 276px);
  color: #686868;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1000px) {
    ${({ noMobileSpacing }) => noMobileSpacing
    && `margin-top: 107px;
        margin-bottom: 0;
        min-height: calc(100vh - 276px + 40px);
        `}
  }
`;

export default Container;
