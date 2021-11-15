/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { IoMenu } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import UserButton from './UserButton';
import CategoriesMenu from './CategoriesMenu';

const HeaderDesktop = ({ showCategoriesMenu, setShowCategoriesMenu }) => {
  const navigate = useNavigate();
  const showMenu = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
  };

  return (
    <Container>
      <Content>

        <Group1>
          <MenuCategories onClick={showMenu}><MenuIcon /></MenuCategories>
          <CategoriesMenu mustBeShown={showCategoriesMenu} setMustBeShown={setShowCategoriesMenu} />
          <Logo onClick={() => navigate('/')}> dev_store </Logo>
        </Group1>

        <ContainerSearchBox>
          <SearchBox />
        </ContainerSearchBox>

        <Group2>
          <CartIcon onClick={() => navigate('/carrinho')} />
          <UserButton />
        </Group2>

      </Content>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: 1500px;
`;

const Group1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 320px;
  margin-left: 40px;

  @media (max-width: 1000px) {
    margin-left: 10px;
    min-width: 200px;
  }
`;

const ContainerSearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 0 50px;
  margin-right: 40px;

  @media (max-width: 1000px) {
    margin-right: 0;
    padding: 0 30px;
  }
`;

const Group2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px;
  margin-right: 40px;

  @media (max-width: 1000px) {
    margin-right: 10px;
    min-width: 120px;
  }
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
  font-size: 40px;
  cursor: pointer;

  @media (max-width: 1000px) {
    font-size: 30px;
  }

`;

const Logo = styled.span`
  font-family: 'Quantico', sans-serif;
  color: white;
  font-size: 45px;
  cursor: pointer;

  @media (max-width: 1000px) {
    font-size: 24px;
}
`;

const MenuCategories = styled.button`
  background-color: inherit;
      :hover{
      background-color: #D43476;;
    }
`;

export default HeaderDesktop;
