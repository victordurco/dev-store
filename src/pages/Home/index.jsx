/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Footer from '../shared/Footer';

// eslint-disable-next-line arrow-body-style
const getItems = () => Array(20)
  .fill(0)
  .map((_, ind) => ({ id: `element-${ind}` }));

const HomePage = () => {
  const [items] = useState(getItems);
  const [selected, setSelected] = useState([]);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick = (id) => () => {
    const itemSelected = isItemSelected(id);

    setSelected((currentSelected) => (itemSelected
      ? currentSelected.filter((el) => el !== id)
      : currentSelected.concat(id)));
  };
  const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

    return (
      <div disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        Left
      </div>
    );
  };
  const RightArrow = () => {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

    return (
      <div disabled={isLastItemVisible} onClick={() => scrollNext()}>
        Right
      </div>
    );
  };
  const Card = ({
    onClick,
    itemSelected,
    title,
    itemId,
  }) => {
    const visibility = React.useContext(VisibilityContext);

    return (
      <div
        onClick={() => onClick(visibility)}
        style={{
          width: '160px',
        }}
        tabIndex={0}
      >
        <div className="card">
          <div>{title}</div>
          <div>
            visible:
            {' '}
            {JSON.stringify(!!visibility.isItemVisible(itemId))}
          </div>
          <div>
            selected:
            {' '}
            {JSON.stringify(!!itemSelected)}
          </div>
        </div>
        <div
          style={{
            height: '200px',
          }}
        />
      </div>
    );
  };

  return (
    <HomeContainer>
      <Header>
        <Logo> dev_store </Logo>
      </Header>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
      >
        {items.map(({ id }) => (
          <Card
            itemId={id} // NOTE: itemId is required for track items
            title={id}
            key={id}
            onClick={handleClick(id)}
            itemSelected={isItemSelected(id)}
          />
        ))}
      </ScrollMenu>
      <Footer />
    </HomeContainer>
  );
};

export default HomePage;

const Header = styled.header`
    background-color: #FA4098;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    height: 109px;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding-left: 182px;

    @media (max-width: 800px) {
       justify-content: center;
       padding-left: 0;
    }
`;

const Logo = styled.span`
    font-family: 'Quantico', sans-serif;
    color: white;
    font-size: 45px;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
`;
