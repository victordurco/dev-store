/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
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
      .catch(() => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo deu errado, por favor recarregue a pagina',
      }));
    getProductsOnSale()
      .then((res) => {
        setOnSale(res.data);
        setLoading((value) => value + 1);
      })
      .catch(() => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo deu errado, por favor recarregue a pagina',
      }));
  }, []);

  return (
    <HomeContainer>
      <Header>
        <Logo> dev_store </Logo>
      </Header>
      {loading >= 2
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
                    code={product.code}
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
                    code={product.code}
                  />
                ))}
              </ScrollMenu>
            </MenuContainer>
          </MenusContainer>
        )
        : (
          <MenusContainer loading="loading">
            <Loader
              type="Puff"
              color="#FA4098"
              height={200}
              width={200}
              timeout={3000}
            />
          </MenusContainer>
        )}
      <Footer />
    </HomeContainer>
  );
};

export default HomePage;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
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

  @media (max-width: 600px){
    width: 100%;
    font-size: 25px;
  }
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
  width: 90%;
  max-width: 1400px;
  min-height: calc(100vh - 129px);
  padding: 15px 0px;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.loading === 'loading' ? 'center' : 'initial')};;
   div::-webkit-scrollbar {
    display: none;
}
`;

const MenuContainer = styled.div`
  width: 100%;
  margin: 40px 0;
`;
