import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FiMapPin } from 'react-icons/fi';
import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';
import Container from '../shared/Container';
import { getCart, deleteProduct, finishCart } from '../../services/devStore.services';
import UserContext from '../../contexts/UserContext';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [update, setUpdate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  const updateList = () => {
    setUpdate((state) => !state);
  };

  const removeProduct = (code) => {
    Swal.fire({
      title: 'Remover produto',
      text: 'Deseja remover este produto do carrinho?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#909090',
      confirmButtonText: 'Remover',
      cancelButtonText: 'Não',
      allowOutsideClick: 'false',
    }).then((response) => {
      if (response.isConfirmed) {
        deleteProduct(code, user.token)
          .then(() => {
            updateList();
          })
          .catch(() => {
            Swal.fire(
              'Erro',
              'Falha ao remover produto do carrinho',
              'error',
            );
          });
      }
    });
  };

  useEffect(() => {
    setIsLoading(false);
    if (user) {
      getCart(user.token)
        .then((response) => {
          setCart({ ...response.data });
        })
        .catch(() => {
        });
    }
  }, [update, user]);

  const showFinishOrderPopUp = () => {
    Swal.fire({
      title: 'Finalizar compra',
      text: 'Deseja finalizar a compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#41E45B',
      cancelButtonColor: '#909090',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Ainda não',
      allowOutsideClick: 'false',
    }).then((response) => {
      if (response.isConfirmed) {
        setIsLoading(true);
        finishCart(user.token)
          .then(() => {
            setIsLoading(false);
            Swal.fire(
              'Sucesso',
              'Compra realizada com sucesso!',
              'success',
            ).then(() => {
              navigate('/');
            });
          })
          .catch(() => {
            setIsLoading(false);
            Swal.fire(
              'Erro',
              'Falha ao finalizar a compra',
              'error',
            );
          });
      }
    });
  };

  return (cart.products && cart.products.length > 0) ? (
    <Container noMobileSpacing>
      <ProductsContainer>
        {cart.products && (
          cart.products.map((product) => (
            <ProductContainer key={product.code}>
              <Link to={`/produtos/${product.code}`}>
                <ContainerImage>
                  <Image src={product.photo} alt={product.name} />
                </ContainerImage>
              </Link>
              <ContainerInfo>
                <TopRow>
                  <ProductNameLine>
                    <ProductName>
                      {product.name}
                    </ProductName>
                    <DeleteButton onClick={() => removeProduct(product.code)} />
                  </ProductNameLine>

                  <ProductDescription>
                    {product.description.length > 280
                      ? `${product.description.substring(0, 280)}...`
                      : product.description}
                  </ProductDescription>
                </TopRow>
                <BottomRow>
                  <Bold>
                    Quantidade:
                    {' '}
                    {product.quantity}
                  </Bold>
                  <Bold>
                    Total:
                    R$
                    {' '}
                    {Number(product.price).toFixed(2)}
                  </Bold>
                </BottomRow>
              </ContainerInfo>
            </ProductContainer>
          ))
        )}
      </ProductsContainer>
      {user && (
        <OrderInfo>
          <Group>
            <Bold size="28px" color="black"> Dados da compra: </Bold>
            <TextRow>
              Nome do comprador:
              {' '}
              <strong>{user.name}</strong>
            </TextRow>
            <TextRow>
              Telefone para contato:
              {' '}
              <strong>{user.phone}</strong>
            </TextRow>
            <TextRow>Frete grátis</TextRow>
            <TextRow>Chegará em até 3 dias</TextRow>
            <TextRow> Endereço de entrega: </TextRow>
            <Address>
              <FiMapPin />
              {user.address.address}
              {', '}
              {user.address.state}
            </Address>
            <Bold size="20px" color="black">
              {' '}
              Total: R$
              {' '}
              {cart.total}
              {' '}
            </Bold>
            <Group>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                color="secondary"
                onClick={showFinishOrderPopUp}
                margin="normal"
                size="large"
                type="submit"
                form="myform"
                fullWidth
              >
                <strong>
                  Finalizar compra
                </strong>
              </LoadingButton>
            </Group>
          </Group>
        </OrderInfo>
      )}

    </Container>
  ) : (
    <Container>
      <NoProductMessage>
        Parece que você ainda não adicionou nenhum produto ao carrinho
      </NoProductMessage>
    </Container>
  );
};

const NoProductMessage = styled.span`
  font-size: 24px;
  margin: auto;
`;

const DeleteButton = styled(BiTrash)`
  color: red;
  cursor: pointer;
`;

const ProductsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const ProductContainer = styled.li`
  width: 50vw;
  min-width: 800px;
  height: 100px;
  margin: 0 auto;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px 2px rgba(212, 52, 118, 0.4);
  border-radius: 10px;
  display: flex;
  color: #000000;
  padding: 5px;
  margin-top: 20px;

  @media (max-width: 800px) {
    min-width: 0;
    width: 100vw;
    border-radius: 0;
  }
  
`;

const ProductName = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    max-width: 90%;
    width: 100%;
`;

const ContainerInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: calc(100% - 100px);
`;

const ProductDescription = styled.div`
      font-size: 14px;
      color: #979797;
      max-width: 90%;
      margin-top: 3px;
      height: 40px;
      overflow: hidden;
      display: flex;
      

      `;

const TopRow = styled.div`
      width: 100%;
      height: fit-content;
      margin-top: 5px;
      padding-left: 15px;
      
      `;

const BottomRow = styled.div`
      width: 100%;
      height: fit-content;
      padding-left: 15px;
      display: flex;
      justify-content:space-between;
`;

const Bold = styled.span`
      font-size: ${({ size }) => (size || '16px')};
      font-weight: bold;
      color: ${({ color }) => (color || '#FA4098')};
      `;

const ContainerImage = styled.div`
      width: 100px;
      height: 100%;
      align-items: center;
      `;

const Image = styled.img`
      width: 100%;
      height: 100%;
      object-fit: contain;
      `;

const OrderInfo = styled.div`
      width: 50vw;
      min-width: 800px;
      margin-top: px;
      margin-bottom: 50px;
      display: flex;
      flex-direction: column;
      padding: 0 5px;
      @media (max-width: 800px) {
        min-width: 0;
        width: 100%
      }
      `;

const Group = styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      color: black;
      width: 100%;

      `;

const Address = styled.span`
      color: #FA4098;
      text-decoration: underline;
      margin-top: 5px;
      margin-bottom: 5px;

      & {
        svg {
        font-size: 15px;
        margin-right: 5px;
      }
    }
      `;

const TextRow = styled.span`
      margin-top: 3px;
      max-width: 100%;
      width: 100%;
      `;

const ProductNameLine = styled.span`
  margin-top: 3px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  
`;

export default Cart;
