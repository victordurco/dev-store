/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SearchOption = ({ photo, name, code }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produtos/${code}`);
  };

  return (
    <Container onClick={handleClick}>
      <Photo src={photo} alt="option photo" />
      <ProductName>{name}</ProductName>
    </Container>
  );
};

export default SearchOption;

const Container = styled.div`
  width: 100%;
  height: 66px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2px;
  padding-left: 15px;
  border-radius: 10px;
  
  :hover{
    border: 1px #FA4098 solid;
  }
`;

const Photo = styled.img`
  height: 100%;
`;

const ProductName = styled.span`
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-left: 20px;
`;
