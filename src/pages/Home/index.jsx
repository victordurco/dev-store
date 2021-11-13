/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import ProductCard from '../shared/ProductCard';
import products from './products';

const HomePage = () => {
  const LeftArrow = () => {
    const { scrollPrev } = React.useContext(VisibilityContext);
    return (
      <Arrow onClick={() => scrollPrev()}>
        {'<'}
      </Arrow>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = React.useContext(VisibilityContext);
    return (
      <Arrow onClick={() => scrollNext()}>
        {'>'}
      </Arrow>
    );
  };

  return (
    <HomeContainer>
      <Header>
        <Logo> dev_store </Logo>
      </Header>
      <MenusContainer>
        <Title>{'< Destaques />'}</Title>
        <MenuContainer>
          <ScrollMenu
            LeftArrow={<LeftArrow />}
            RightArrow={<RightArrow />}
          >
            {products.map((product) => (
              <ProductCard
                itemId={product.id}
                key={product.id}
                title={product.name}
                image={product.image}
                price={product.price}
              />
            ))}
          </ScrollMenu>
        </MenuContainer>
        <Title>{'< Promoções />'}</Title>
        <MenuContainer>
          <ScrollMenu
            LeftArrow={<LeftArrow />}
            RightArrow={<RightArrow />}
          >
            {products.map((product) => (
              <ProductCard
                itemId={product.id}
                key={product.id}
                title={product.name}
                image={product.image}
                price={product.price}
              />
            ))}
          </ScrollMenu>
        </MenuContainer>
      </MenusContainer>
      <Footer />
    </HomeContainer>
  );
};

export default HomePage;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Logo = styled.span`
    font-family: 'Quantico', sans-serif;
    color: white;
    font-size: 45px;
`;

const Title = styled.span`
  font-family: 'Quantico', sans-serif;
  font-size: 40px;
  font-weight: 700;
  color:#686868;
`;

const Arrow = styled.div`
  background-color:#fff;
  width: 50px;
  height: 50px;
  margin: auto 10px;
  border-radius:100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color:#FA4098;

  :hover{
    background-color:#c2c2c2;
  }
`;

const MenusContainer = styled.div`
  margin-top:120px;
  width: 100%;
  padding: 10px 100px;
  scrollbar-width: none;
   div::-webkit-scrollbar {
    display: none;
}
`;

const MenuContainer = styled.div`
  width: 100%;
  margin: 15px 0;
`;
