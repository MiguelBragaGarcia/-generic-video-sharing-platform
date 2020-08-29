import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { GoSearch } from 'react-icons/go';
import { FiLogIn } from 'react-icons/fi';
import { MdVideoCall } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

import {
  Container,
  HeaderContainer,
  MainPageButton,
  ButtonActionsContainer,
  SearchBar,
  LoginButton,
  SendVideoButton,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/Auth';

const Header: React.FC = () => {
  const history = useHistory();

  const [searchInput, setSearchInput] = useState('');
  const { user } = useAuth();

  const handleSearch = useCallback(() => {
    const parsedString = searchInput.replace(/[( )]/g, '%');

    history.push({
      pathname: '/results',
      search: `?search=${parsedString}`,
    });
  }, [history, searchInput]);

  return (
    <Container>
      <HeaderContainer>
        <Link to="/">
          <MainPageButton>
            <img src={logoImg} alt="logo" />
          </MainPageButton>
        </Link>

        <SearchBar>
          <input
            type="text"
            placeholder="Buscar por vídeos"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            <GoSearch size={24} color="#FFF" />
          </button>
        </SearchBar>

        <ButtonActionsContainer>
          <Link to="/studio">
            <SendVideoButton>
              <MdVideoCall size={30} />
            </SendVideoButton>
          </Link>

          {user ? (
            <Link to="/profile">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} />
              ) : (
                <FaUserCircle />
              )}
            </Link>
          ) : (
            <Link to="/signin">
              <LoginButton>
                <FiLogIn size={24} />
                Fazer Login
              </LoginButton>
            </Link>
          )}
        </ButtonActionsContainer>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
