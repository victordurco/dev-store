/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({
  image,
  title,
  price,
  code,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/produtos/${code}`);
  };

  return (
    <Card
      onClick={handleClick}
    >
      <Image src={image} alt="product image" />
      <Title>{title}</Title>
      <Price>{`R$ ${price}`}</Price>
      <PaymentOption>12x no cartão de crédito</PaymentOption>
    </Card>
  );
};

const Card = styled.div`
  height:295px;
  width:238px;
  margin: 5px 7.5px;
  background-color:white;
  box-shadow: 0px 4px 4px 2px #D4347666;
  border-radius:10px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #686868;
  justify-content: space-around;
  cursor: pointer;

  @media (max-width: 600px){
    height: 195px;
    width: 138px;
  }
`;

const Image = styled.img`
  height: 136px;

  @media (max-width: 600px){
    height: 90px;
  }
`;

const Title = styled.div`
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  height: 40px;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;

  @media (max-width: 600px){
    font-size: 16px;
    height: 30px;
  }
`;

const Price = styled.div`
  font-size: 30px;
  color: #D43476;
  font-weight: 700;
  overflow-x: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const PaymentOption = styled.div`
  font-size: 18px;
  text-align: center;

  @media (max-width: 600px){
    font-size: 12px;
  }
`;
export default ProductCard;
