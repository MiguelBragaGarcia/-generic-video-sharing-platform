import React from 'react';
import { GoSearch } from 'react-icons/go';
import { FiLogIn } from 'react-icons/fi';
import { MdVideoCall } from 'react-icons/md';

import logoImg from '../../assets/logo.svg';

import {
  Header,
  HeaderContainer,
  MainPageButton,
  ButtonActionsContainer,
  SearchBar,
  LoginButton,
  SendVideoButton,
  Content,
  VideoContainer,
  Video,
  VideoInfo,
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

        <ButtonActionsContainer>
          <SendVideoButton>
            <MdVideoCall size={30} />
          </SendVideoButton>

          <LoginButton>
            <FiLogIn size={24} />
            Fazer Login
          </LoginButton>
        </ButtonActionsContainer>
      </HeaderContainer>
    </Header>

    <Content>
      <VideoContainer>
        <Video>
          <img
            src="https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg"
            alt="video thumb"
          />
          <VideoInfo>
            <img
              src="https://avatars0.githubusercontent.com/u/52131821?s=460&u=1c87b1763d932fcfc0fa0ce97aad157244a08bd4&v=4"
              alt="avatar_url"
            />

            <div>
              <strong>
                Esse é um título de um vídeo, texto aleatórioa para preencher
                multiplas
              </strong>
              <p>Jenkins Dota</p>
              <p>30 mil vizualizações</p>
            </div>
          </VideoInfo>
        </Video>

        <Video>
          <img
            src="https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg"
            alt="video thumb"
          />
          <VideoInfo>
            <img
              src="https://avatars0.githubusercontent.com/u/52131821?s=460&u=1c87b1763d932fcfc0fa0ce97aad157244a08bd4&v=4"
              alt="avatar_url"
            />

            <div>
              <strong>
                Esse é um título de um vídeo, texto aleatórioa para preencher
                multiplas
              </strong>
              <p>Jenkins Dota</p>
              <p>30 mil vizualizações</p>
            </div>
          </VideoInfo>
        </Video>

        <Video>
          <img
            src="https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg"
            alt="video thumb"
          />
          <VideoInfo>
            <img
              src="https://avatars0.githubusercontent.com/u/52131821?s=460&u=1c87b1763d932fcfc0fa0ce97aad157244a08bd4&v=4"
              alt="avatar_url"
            />

            <div>
              <strong>
                Esse é um título de um vídeo, texto aleatórioa para preencher
                multiplas
              </strong>
              <p>Jenkins Dota</p>
              <p>30 mil vizualizações</p>
            </div>
          </VideoInfo>
        </Video>

        <Video>
          <img
            src="https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg"
            alt="video thumb"
          />
          <VideoInfo>
            <img
              src="https://avatars0.githubusercontent.com/u/52131821?s=460&u=1c87b1763d932fcfc0fa0ce97aad157244a08bd4&v=4"
              alt="avatar_url"
            />

            <div>
              <strong>
                Esse é um título de um vídeo, texto aleatórioa para preencher
                multiplas
              </strong>
              <p>Jenkins Dota</p>
              <p>30 mil vizualizações</p>
            </div>
          </VideoInfo>
        </Video>

        <Video>
          <img
            src="https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg"
            alt="video thumb"
          />
          <VideoInfo>
            <img
              src="https://avatars0.githubusercontent.com/u/52131821?s=460&u=1c87b1763d932fcfc0fa0ce97aad157244a08bd4&v=4"
              alt="avatar_url"
            />

            <div>
              <strong>
                Esse é um título de um vídeo, texto aleatórioa para preencher
                multiplas
              </strong>
              <p>Jenkins Dota</p>
              <p>30 mil vizualizações</p>
            </div>
          </VideoInfo>
        </Video>

        <Video>
          <img
            src="https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg"
            alt="video thumb"
          />
          <VideoInfo>
            <img
              src="https://avatars0.githubusercontent.com/u/52131821?s=460&u=1c87b1763d932fcfc0fa0ce97aad157244a08bd4&v=4"
              alt="avatar_url"
            />

            <div>
              <strong>
                Esse é um título de um vídeo, texto aleatórioa para preencher
                multiplas
              </strong>
              <p>Jenkins Dota</p>
              <p>30 mil vizualizações</p>
            </div>
          </VideoInfo>
        </Video>
      </VideoContainer>
    </Content>
  </>
);
export default Dashboard;
