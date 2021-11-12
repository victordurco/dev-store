/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styled from 'styled-components';

const ProductCard = ({
  itemName,
}) => {
  const handleClick = () => {
    alert('Clicou num item');
  };

  return (
    <Card
      onClick={handleClick}
    >
      {itemName}
    </Card>
  );
};

const Card = styled.div`
  height:195px;
  width:138px;
  margin-left: 15px;
  background-color:pink;

`;

export default ProductCard;
