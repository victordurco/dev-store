import React from 'react';
import styled from 'styled-components';
import Footer from '../shared/Footer';

// eslint-disable-next-line arrow-body-style
const HomePage = () => {
  return (
    <HomeContainer>
      <Header>
        <Logo> dev_store </Logo>
      </Header>
      <Footer />
    </HomeContainer>
  );
};

export default HomePage;

const Header = styled.header`
    background-color: #FA4098;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    height: 109px;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding-left: 182px;

    @media (max-width: 800px) {
       justify-content: center;
       padding-left: 0;
    }
`;

const Logo = styled.span`
    font-family: 'Quantico', sans-serif;
    color: white;
    font-size: 45px;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
`;
