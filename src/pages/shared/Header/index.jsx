import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  return (
    <Container>
      {(pathname === '/entrar' || pathname === '/cadastro') ? (
        <HeaderSimple>
          <Logo onClick={() => navigate('/')}> dev_store </Logo>
        </HeaderSimple>
      ) : (
        <>
          <HeaderDesktop
            showCategoriesMenu={showCategoriesMenu}
            setShowCategoriesMenu={setShowCategoriesMenu}
          />
          <HeaderMobile
            showCategoriesMenu={showCategoriesMenu}
            setShowCategoriesMenu={setShowCategoriesMenu}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 109px;
  background-color: #FA4098;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const HeaderSimple = styled.header`
  padding-left: 182px;
  height: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    justify-content: center;
    padding-left: 0;
  }
`;

const Logo = styled.span`
  font-family: 'Quantico', sans-serif;
  color: white;
  font-size: 45px;
  cursor: pointer;
`;

export default Header;
