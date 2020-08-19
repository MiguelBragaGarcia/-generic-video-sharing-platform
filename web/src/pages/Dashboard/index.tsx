import React from 'react';
import { GoSearch } from 'react-icons/go';
import { FiLogIn } from 'react-icons/fi';
import { MdVideoCall } from 'react-icons/md';

import logoImg from '../../assets/logo.svg';

import {
  Header,
  HeaderContainer,
  MainPageButton,
  SearchBar,
  LoginButton,
  SendVideoButton,
} from './styles';

const Dashboard: React.FC = () => (
  <>
    <Header>
      <HeaderContainer>
        <MainPageButton>
          <img src={logoImg} alt="logo" />
        </MainPageButton>

        <SearchBar>
          <input type="text" placeholder="Buscar por vídeos" />
          <button type="button">
            <GoSearch size={24} color="#FFF" />
          </button>
        </SearchBar>

        <SendVideoButton>
          <MdVideoCall size={30} />
        </SendVideoButton>

        <LoginButton>
          <FiLogIn size={24} />
          Fazer Login
        </LoginButton>
      </HeaderContainer>
    </Header>
  </>
);
export default Dashboard;
