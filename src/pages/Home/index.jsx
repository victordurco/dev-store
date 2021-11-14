/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import ProductCard from '../shared/ProductCard';
import { getProductsHighlights, getProductsOnSale } from '../../services/devStore.services';

const HomePage = () => {
  const [highlights, setHighlights] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const [loading, setLoading] = useState(0);

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

  useEffect(() => {
    getProductsHighlights()
      .then((res) => {
        setHighlights(res.data);
        setLoading((value) => value + 1);
      })
      .catch(() => alert('cai aqui 1'));
    getProductsOnSale()
      .then((res) => {
        setOnSale(res.data);
        setLoading((value) => value + 1);
      })
      .catch(() => alert('cai aqui 1'));
  }, []);

  console.log(loading);
  return (
    <HomeContainer>
      <Header>
        <Logo> dev_store </Logo>
      </Header>
      { loading >= 2
        ? (
          <MenusContainer>
            <Title>{'< Destaques />'}</Title>
            <MenuContainer>
              <ScrollMenu
                LeftArrow={<LeftArrow />}
                RightArrow={<RightArrow />}
              >
                {highlights.map((product) => (
                  <ProductCard
                    itemId={product.id}
                    key={product.id}
                    title={product.name}
                    image={product.photo}
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
                {onSale.map((product) => (
                  <ProductCard
                    itemId={product.id}
                    key={product.id}
                    title={product.name}
                    image={product.photo}
                    price={product.price}
                  />
                ))}
              </ScrollMenu>
            </MenuContainer>
          </MenusContainer>
        )
        : <div>CARREGANDO ...</div>}
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
  background-color:#FA4098;
  color: #fff;
  width: 50px;
  height: 50px;
  margin: auto 10px;
  border-radius:100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  cursor: pointer;

  :hover{
     background-color:#41E45B;
      color:#fff;
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
