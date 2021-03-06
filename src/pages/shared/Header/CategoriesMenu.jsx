/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../services/devStore.services';

const CategoriesMenu = ({ mustBeShown, setMustBeShown }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleClickOnCategory = (id) => {
    setMustBeShown(false);
    navigate(`/categoria/${id}`, { replace: true });
  };

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch();
  }, []);

  return (
    <>
      <DropDrownMenu show={mustBeShown}>
        {categories.map((category) => (
          <Category
            key={category.id}
            show={mustBeShown}
            onClick={() => handleClickOnCategory(category.id)}
          >
            {category.name}
          </Category>
        ))}
      </DropDrownMenu>
      <BackgroundCover show={mustBeShown} onClick={() => setMustBeShown(false)} />
    </>
  );
};

const DropDrownMenu = styled.div`
    height: ${(props) => (props.show ? '500px' : '0px')};
    width: 350px;
    background-color: #fd6aafe8;
    position: absolute;
    top: 109px;
    left: 0;
    z-index: 2;
    border-radius: 10px;
    border-top-left-radius: 0px;
    transition: height 450ms ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width:600px){
      width: 100vw;
    }
`;

const BackgroundCover = styled.div`
  position:absolute;
  top: 109px;
  left: 0;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  width: 100vw;
  height: ${(props) => (props.show ? 'calc(100vh - 109px)' : '0')};
  background-color: #a5a5a588;
  z-index: 1;
  transition: visibility 0.1s, opacity 0.5s linear;
`;

const Category = styled.span`
  font-size: 30px;
  font-weight: 700;
  font-family: 'Quantico', sans-serif;
  color: white;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 0.1s, opacity 1s linear;
  margin-bottom: 15px;
  cursor: pointer;

  :hover{
    color: #686868;
  }
`;

export default CategoriesMenu;
