import React from 'react';
import styled from 'styled-components';

const SignUp = () => (
  <div>
    <Header>
      <Logo>
        dev_store
      </Logo>
    </Header>
  </div>
);

export default SignUp;

const Header = styled.div`
  width: 100%;
  height: 109px;
  background-color: #fa4098;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 4px 0px #00000040;

`;

const Logo = styled.span`
    font-size: 45px;
    margin: auto 0 auto 182px;
    color: white;
    font-family: 'Quantico', sans-serif;
`;
