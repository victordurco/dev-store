/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { IoMenu } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import UserButton from './UserButton';
import CategoriesMenu from './CategoriesMenu';

const Header = ({ showCategoriesMenu, setShowCategoriesMenu }) => {
  const navigate = useNavigate();
  const showMenu = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
  };

  return (
    <HeaderMobile>
      <Content>
        <Row>
          <Group1>
            <MenuCategories onClick={showMenu}><MenuIcon /></MenuCategories>
            <CategoriesMenu
              mustBeShown={showCategoriesMenu}
              setMustBeShown={setShowCategoriesMenu}
            />
            <Logo onClick={() => navigate('/')}> dev_store </Logo>
          </Group1>
          <Group2>
            <UserButton />
            <CartIcon onClick={() => navigate('/carrinho')} />
          </Group2>
        </Row>

        <ContainerSearchBox>
          <SearchBox />
        </ContainerSearchBox>

      </Content>
    </HeaderMobile>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
`;

const Content = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1500px;
`;

const Group1 = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 320px;

      @media (max-width: 1000px) {
        margin-left: 10px;
        min-width: 170px;
      }
`;

const ContainerSearchBox = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 800px;
      padding: 0 10px;
`;

const Group2 = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 90px;
      margin: 0 10px;
`;

const MenuIcon = styled(IoMenu)`
      color: #fff;
      font-size: 64px;
      cursor: pointer;

      @media (max-width: 1000px) {
        font-size: 42px;
  }
`;

const CartIcon = styled(FaShoppingCart)`
      color: #fff;
      font-size: 30px;
      cursor: pointer;
`;

const HeaderMobile = styled.header`
      display: flex;
      align-items: center;
      justify-content: center;
      display: none;

      @media (max-width: 600px) {
        display: flex;
      }
`;

const Logo = styled.span`
      font-family: 'Quantico', sans-serif;
      color: white;
      font-size: 32px;
      cursor: pointer;
      margin-left: 10px;
`;

const MenuCategories = styled.button`
background-color: inherit;
    :hover{
    background-color: #D43476;;
  }
`;

export default Header;
