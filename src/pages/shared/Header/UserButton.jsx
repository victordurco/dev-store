import { FaRegUserCircle } from 'react-icons/fa';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../../../contexts/UserContext';
import standardProfilePicture from '../../../assets/imgs/profile-standard.jpg';

const UserButton = () => {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();
  const [imageError, setImageError] = useState(false);
  const next = (pathname !== '/') ? `?next=${pathname}` : '';
  let name;

  if (user) {
    if (user.name.length > 20) {
      name = `${user.name.substring(0, 20)}...`;
    } else {
      name = user.name;
    }
  }

  const photo = (user && user.photo && !imageError)
    ? user.photo : standardProfilePicture;

  return (
    (user ? (
      <UserContainer>
        <UserPhoto src={photo} onError={() => setImageError(true)} />
        <NameText>
          {name}
        </NameText>
      </UserContainer>
    ) : (
      <Link to={`/entrar${next}`}>
        <UserContainer>
          <UserIcon />
          <NameText>
            Entrar
          </NameText>
        </UserContainer>
      </Link>

    ))
  );
};

const UserIcon = styled(FaRegUserCircle)`
  color: #fff;
  font-size: 40px;
  cursor: pointer;

  @media (max-width: 1000px) {
    font-size: 30px;
  }
`;

const UserPhoto = styled.img`
  color: #fff;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  cursor: pointer;

  @media (max-width: 600px) {
    padding: 5px;
    width: 50px;
    height: 50px;
  }
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NameText = styled.span`
  color: #fff;
  font-weight: bold;
  margin-top: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  width: 80px;
  word-wrap: break-word;
  @media (max-width: 600px) {
    display: none;
  }
`;

export default UserButton;
