/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const CategoriesMenu = ({ mustBeShown, setMustBeShown }) => (
  <>
    <DropDrownMenu show={mustBeShown} />
    <BackgroundCover show={mustBeShown} onClick={() => setMustBeShown(false)} />
  </>
);

const DropDrownMenu = styled.div`
    height: ${(props) => (props.show ? '85vh' : '0px')};
    width: 20vw;
    background-color: #fd6aaff1;
    position: absolute;
    top: 109px;
    left: 0;
    z-index: 2;
    border-radius: 10px;
    border-top-left-radius: 0px;
    transition: 400ms;
`;

const BackgroundCover = styled.div`
  position:absolute;
  top: 109px;
  left: 0;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};;
  width: 98.8vw;
  height: 100vh;
  background-color: #a5a5a588;
  z-index: 1;
  transition: visibility 0.1s, opacity 0.5s linear;
`;

export default CategoriesMenu;
