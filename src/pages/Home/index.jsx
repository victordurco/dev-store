/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import ProductCard from '../shared/ProductCard';

const HomePage = () => {
  const products = [{
    name: 'Produto',
    description: '28cm',
    id: 1,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 2,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 3,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 4,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 5,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 6,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 7,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 8,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 9,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 10,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 11,
  },
  {
    name: 'Produto',
    description: '28cm',
    id: 12,
  },

  ];

  function LeftArrow() {
    const { scrollPrev } = React.useContext(VisibilityContext);
    return (
      <Arrow onClick={() => scrollPrev()}>
        Left
      </Arrow>
    );
  }

  function RightArrow() {
    const { scrollNext } = React.useContext(VisibilityContext);
    return (
      <Arrow onClick={() => scrollNext()}>
        Right
      </Arrow>
    );
  }

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
                itemName={product.name}
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
                itemName={product.name}
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
  background-color:blue;
  width: 50px;
  height: 50px;
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
