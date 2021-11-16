import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import LoadingButton from '@mui/lab/LoadingButton';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
import Container from '../shared/Container';
import { getProductByCode, addProductToCart } from '../../services/devStore.services';
import UserContext from '../../contexts/UserContext';
import Footer from '../shared/Footer';

const Products = () => {
  const [product, setProduct] = useState({});
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const { productCode } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const next = `?next=${pathname}`;

  useEffect(() => {
    getProductByCode(productCode)
      .then((res) => {
        setProduct({ ...res.data });
      })
      .catch(() => {
      });
  }, [productCode]);

  const SignInPopUp = () => {
    Swal.fire({
      title: 'Você precisa estar logado para realizar esta ação',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Logar',
      denyButtonText: 'Cadastrar-se',
      confirmButtonColor: '#41E45B',
      denyButtonColor: '#FA4098',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate(`/entrar${next}`);
      } else if (result.isDenied) {
        navigate(`/cadastro${next}`);
      }
    });
  };

  const handleCartClick = () => {
    if (!user) {
      SignInPopUp();
      return;
    }

    setIsLoadingCart(true);
    addProductToCart(productCode, user.token)
      .then(() => {
        setIsLoadingCart(false);
        Swal.fire({
          title: 'Produto adicionado',
          text: 'Deseja ver seu carrinho agora?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#41E45B',
          cancelButtonColor: '#FA4098',
          confirmButtonText: 'Ver carrinho',
          cancelButtonText: 'Continuar comprando',
          allowOutsideClick: 'false',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/carrinho');
          }
        });
      })
      .catch(() => {
        setIsLoadingCart(false);
      });
  };

  const handleBuyClick = () => {
    if (!user) {
      SignInPopUp();
      return;
    }

    setIsLoadingBuy(true);
    addProductToCart(productCode, user.token)
      .then(() => {
        setIsLoadingBuy(false);
        navigate('/carrinho');
      })
      .catch(() => {
        setIsLoadingBuy(false);
      });
  };

  return (
    <>
      <Container noMobileSpacing>
        <ProductContainer>
          {product.name ? (
            <>
              <Row>
                <ContainerImage>
                  <ProductImage src={product.photo} />
                </ContainerImage>
                <ContainerInfo>
                  <Group marginTop="15px">
                    <ProductName>{product.name}</ProductName>
                    <MobileImage src={product.photo} />
                    <PriceTag>
                      {`R$ ${product.price}`}
                    </PriceTag>
                    <span>
                      Em 12x R$
                      {' '}
                      {((product.price / 12) - 0.01).toFixed(2)}
                      {' '}
                      sem juros
                    </span>
                  </Group>

                  <Group>
                    {user && (
                      <Group marginBottom="15px">
                        <span>Frete grátis em:</span>
                        <Address>
                          <FiMapPin />
                          {user.address.address}
                          {', '}
                          {user.address.state}
                        </Address>
                        <Stock>
                          Estoque:
                          {' '}
                          {product.quantity}
                          {' '}
                          unidades
                        </Stock>
                      </Group>
                    )}

                    <LoadingButton
                      loading={isLoadingBuy}
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={handleBuyClick}
                      fullWidth
                    >
                      <strong> Comprar </strong>
                    </LoadingButton>

                    <LoadingButton
                      loading={isLoadingCart}
                      color="primary"
                      margin="normal"
                      size="large"
                      style={{ marginTop: '10px' }}
                      endIcon={<FaShoppingCart />}
                      fullWidth
                      onClick={handleCartClick}
                    >
                      <strong> Adicionar ao carrinho </strong>
                    </LoadingButton>
                  </Group>
                </ContainerInfo>
              </Row>
              <Row marginTop="0">
                <Info>
                  <h1> Descrição: </h1>
                  <span>
                    {product.description}
                  </span>

                  {product.aspects.length > 0 && (
                    <h1> Aspectos: </h1>
                  )}

                  {product.aspects.length > 0 && (
                    product.aspects.map((aspect) => (
                      <span key={aspect.id}>
                        {aspect.name}
                        :
                        {' '}
                        {aspect.value}
                      </span>
                    ))
                  )}

                </Info>
              </Row>
            </>
          ) : (
            <LoaderContainer>
              <Loader
                type="Puff"
                color="#FA4098"
                height={200}
                width={200}
                timeout={3000}
              />
            </LoaderContainer>
          )}

        </ProductContainer>
      </Container>
      <Footer />
    </>
  );
};

const ProductContainer = styled.div`
  position: relative;
  width: 85vw;
  max-width: 1080px;
  min-height: calc(100vh - 310px);
  margin: 0 auto;
  padding-bottom: 20px;
  margin-bottom: 30px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px 2px rgba(212, 52, 118, 0.4);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  color: #686868;

  & {
    h1 {
      font-weight: bold;
      font-size: 20px;
      margin-top: 10px;
    }
  }

  @media (max-width: 1000px) {
    max-width: 100vw;
    width: 100%;
    box-shadow: none;
  }

  @media (max-width: 700px) {
     padding-bottom: 0;
     height: fit-content;
     border-radius: 0;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ marginTop }) => (marginTop || '0px')};
  margin-bottom: ${({ marginBottom }) => (marginBottom || '0px')};
  width: 100%;
  @media (max-width: 700px) {
  margin-top: ${({ marginTop }) => (marginTop ? '23px' : '0px')};
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  & {
    h1 {
      margin-bottom: 10px;
    }

    span {
      font-size: 16px;
      line-height: 21px;
    }
  }

  @media (max-width: 700px) {
    padding: 5px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media (max-width: 700px) {
    display: none;
  }
`;

const ProductImage = styled.img`
  width: 80%;
`;

const MobileImage = styled.img`
  max-width: 100%;
  display: none;
  max-height: 400px;
  object-fit: contain;
  @media (max-width: 700px) {
    display: block;
  }
`;

const ContainerInfo = styled.div`
  width: 45%;
  display: flex;
  padding: 0 14px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 700px) {
    width: 100%;
    height: fit-content;
    padding: 5px;
  }
`;

const ProductName = styled.span`
  height: fit-content;
  font-weight: bold;
  font-size: 30px;
  line-height: 35px;
  color: black;
  @media (max-width: 1000px) {
    font-size: 24px;
  }

  @media (max-width: 700px) {
    font-size: 20px;
  }
`;

const PriceTag = styled.span`
  font-weight: bold;
  margin-top: 5px;
  font-size: 35px;
  line-height: 41px;
  color: #000000;

  @media (max-width: 1000px) {
    font-size: 28px;
  }

  @media (max-width: 700px) {
    font-size: 24px;
  }
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

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
export default Products;
