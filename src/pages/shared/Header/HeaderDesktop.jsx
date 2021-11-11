import React from 'react';
import styled from 'styled-components';
import { IoMenu } from 'react-icons/io5';
import { FaRegUserCircle, FaShoppingCart } from 'react-icons/fa';
import SearchBox from './SearchBox';

const HeaderDesktop = () => (
  <Container>
    <Content>
      <Group1>
        <MenuIcon />
        <Logo> dev_store </Logo>
      </Group1>

      <ContainerSearchBox>
        <SearchBox />
      </ContainerSearchBox>

      <Group2>
        <UserContainer>
          <UserIcon />
          <NameText>
            Entrar
          </NameText>
        </UserContainer>
        <CartIcon />
      </Group2>
    </Content>
  </Container>
);

const Container = styled.header`
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
  justify-content: center;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
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
  margin-left: 40px;

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

  @media (max-width: 1000px) {
    font-size: 42px;
  }
`;

const UserIcon = styled(FaRegUserCircle)`
  color: #fff;
  font-size: 40px;

  @media (max-width: 1000px) {
    font-size: 30px;
  }
`;

const CartIcon = styled(FaShoppingCart)`
  color: #fff;
  font-size: 40px;

  @media (max-width: 1000px) {
    font-size: 30px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NameText = styled.span`
  color: #fff;
  font-weight: bold;
  margin-top: 10px;
`;

const Logo = styled.span`
      font-family: 'Quantico', sans-serif;
      color: white;
      font-size: 45px;

      @media (max-width: 1000px) {
        font-size: 24px;
  }
`;

export default HeaderDesktop;
