import React from 'react';
import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import Button from '@mui/material/Button';
import Container from '../shared/Container';
/* eslint-disable react/no-array-index-key */

const Products = () => {
  const product = {
    name: 'Monitor Led 27" Samsung Lc27f390 1920x1080 Full Hd Curvo Free Sync-Preto',
    image: 'https://images-submarino.b2w.io/produtos/01/00/img7/01/00/item/133777/3/133777366_1GG.png',
    price: '78,17',
    stock: 109,
    description: `Seja para se entreter jogando, assistindo filmes e séries ou para trabalhar, o monitor curvo Samsung é perfeito para você. Em 27” com formato Wide Screen, sua curvatura em 1800R permitirá que você desfrute de detalhes impressionantes. Prepare-se para mergulhar em todo o conteúdo multimídia que será exibido na tela curva do monitor curvo Led Samsung. \n\n
    A tecnologia AMD FreeSync, presente no monitor curvo Led 27” é caaz de minimizar quebras de imagem, garantindo uma fluidez enquanto você joga seus games. O seu modo de jogos balanceia naturalmente as cores e o contraste, permitindo que você desfrute de cada cena da melhor maneira possível.
    A redução da emissão de luz azul, combinada com a curvatura do monitor gamer led 27” farão com que você sinta menos cansaço nos olhos, mesmo após estar em frente a ele por muito tempo.
    Possuindo o melhor contraste da categoria, o monitor Led 27” exibirá cores escuras mais fortes e brancos muito mais brilhantes, para imagens vívidas e claras. A teça curva do monitor Samsung também minimiza a fuga de luz das entradas, garantindo cores muito mais uniformes em todo o campo de visão.`,
    aspects: {
      Peso: '38kg',
      Largura: '150cm',
      Altura: '100cm',
      Espessura: '20cm',
    },
  };

  const user = {
    endereco: 'Rua Maranguape, Cabuçu, Nova Iguaçu',
  };

  return (
    <Container>
      <ProductContainer>
        <Row>
          <ContainerImage>
            <ProductImage src={product.image} />
          </ContainerImage>
          <ContainerInfo>
            <Group marginTop="15px">
              <ProductName>{product.name}</ProductName>
              <PriceTag>
                R$
                {product.price}
              </PriceTag>
              <span>Em 12x R$ 100.00 sem juros</span>
            </Group>

            <Group marginTop="23px">
              <span>Frete grátis em:</span>
              <Address>
                <FiMapPin />
                {user.endereco}
              </Address>
              <Stock>
                Estoque:
                {' '}
                {product.stock}
                {' '}
                unidades
              </Stock>
            </Group>

            <Group marginTop="20px">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
              >
                <strong> Comprar </strong>
              </Button>

              <Button
                color="primary"
                margin="normal"
                size="large"
                style={{ marginTop: '10px' }}
                endIcon={<FaShoppingCart />}
                fullWidth
              >
                <strong> Adicionar ao carrinho </strong>
              </Button>
            </Group>
          </ContainerInfo>
        </Row>
        <Row>
          <Info>
            <h1> Descrição: </h1>
            <span>
              {product.description}
            </span>

            <h1> Aspectos: </h1>
            {Object.keys(product.aspects).map((name, i) => (
              <span key={i}>
                {name}
                :
                {' '}
                {product.aspects[name]}
              </span>
            ))}
          </Info>
        </Row>
      </ProductContainer>
    </Container>
  );
};

const ProductContainer = styled.div`
      width: 85vw;
      max-width: 1080px;
      margin: 0 auto;
      padding-bottom: 20px;
      background: #FFFFFF;
      box-shadow: 0px 4px 4px 2px rgba(212, 52, 118, 0.4);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      color: #000000;

      & {
        h1 {
          font-weight: bold;
          font-size: 20px;
          margin-top: 10px;
        }
  }
      `;

const Group = styled.div`
      display: flex;
      flex-direction: column;
      margin-top: ${({ marginTop }) => (marginTop || '0px')};
      width: 100%;
      `;

const Info = styled.div`
      display: flex;
      flex-direction: column;
      padding: 0 20px;

      & {
        span {
        font-size: 16px;
        line-height: 21px;
      }
  }
      `;

const Row = styled.div`
      display: flex;
      flex-direction: row;
      margin-top: ${({ marginTop }) => (marginTop || '0px')};
      width: 100%;
      `;

const ContainerImage = styled.div`
      width: 55%;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      `;

const ProductImage = styled.img`
      width: 80%;
      `;

const ContainerInfo = styled.div`
      width: 45%;
      height: 50%;
      display: flex;
      padding: 0 14px;
      align-items: center;
      flex-direction: column;
      height: 400px;
      `;

const ProductName = styled.span`
      height: fit-content;
      font-weight: bold;
      font-size: 30px;
      line-height: 35px;
      color: black;
      width: 90%;
      `;

const PriceTag = styled.span`
      font-weight: bold;
      margin-top: 5px;
      font-size: 35px;
      line-height: 41px;
      color: #000000;
      `;

const Address = styled.span`
      color: #FA4098;
      text-decoration: underline;
      margin-top: 5px;

      & {
        svg {
        font-size: 15px;
      margin-right: 5px;
    }
  }
      `;

const Stock = styled.span`
      margin-top: 10px;
      `;

export default Products;
