import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { GoSearch } from 'react-icons/go';
import { FiLogIn } from 'react-icons/fi';
import { MdVideoCall } from 'react-icons/md';

import api from '../../services/api';

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

interface User {
  id: string;
  name: string;
  avatar_url: string;
}

interface VideoInfo {
  id: string;
  title: string;
  description: string;
  views: number;
  video_url: string;
  video_thumbnail: string;
  user: User;
}

const Dashboard: React.FC = () => {
  const [videos, setVideos] = useState<VideoInfo[]>([]);

  useEffect(() => {
    async function loadVideoList() {
      const response = await api.get<VideoInfo[]>('videos', {
        params: {
          page: 1,
        },
      });

      setVideos(response.data);
    }

    loadVideoList();
  }, []);

  return (
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

            <Link to="/signin">
              <LoginButton>
                <FiLogIn size={24} />
                Fazer Login
              </LoginButton>
            </Link>
          </ButtonActionsContainer>
        </HeaderContainer>
      </Header>

      <Content>
        <VideoContainer>
          {videos.map((video) => (
            <Link key={video.id} to={`/video/${video.id}`}>
              <Video>
                <img src={video.video_thumbnail} alt={video.title} />
                <VideoInfo>
                  <img src={video.user.avatar_url} alt={video.user.name} />

                  <div>
                    <strong>{video.title}</strong>
                    <p>{video.user.name}</p>
                    <p>{video.views} vizualizações</p>
                  </div>
                </VideoInfo>
              </Video>
            </Link>
          ))}
        </VideoContainer>
      </Content>
    </>
  );
};
export default Dashboard;
