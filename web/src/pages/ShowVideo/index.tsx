import React, { useState, useEffect } from 'react';

import ReactPlayer from 'react-player';

import { Link, useRouteMatch } from 'react-router-dom';

import { GoSearch } from 'react-icons/go';
import { FiLogIn } from 'react-icons/fi';
import { MdVideoCall } from 'react-icons/md';

import {
  Header,
  HeaderContainer,
  MainPageButton,
  SearchBar,
  ButtonActionsContainer,
  SendVideoButton,
  LoginButton,
  Content,
  VideoInfo,
  Title,
  UserInfo,
  Description,
} from './styles';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface VideoParams {
  video_id: string;
}

interface User {
  id: string;
  name: string;
  avatar_url: string;
}

interface VideoData {
  id: string;
  title: string;
  description: string;
  views: number;
  video_url: string;
  video_thumbnail: string;
  user: User;
}

const ShowVideo: React.FC = () => {
  const { params } = useRouteMatch<VideoParams>();
  const [videoFromApi, setVideoFromApi] = useState<VideoData>({} as VideoData);

  useEffect(() => {
    async function loadVideoInfo() {
      const response = await api.get<VideoData>(`/videos/${params.video_id}`);

      setVideoFromApi(response.data);
    }

    loadVideoInfo();
  }, [params.video_id]);

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
        <div>
          <ReactPlayer
            url={videoFromApi.video_url}
            controls
            width="100%"
            height="100%"
          />
          <VideoInfo>
            <Title>
              <strong>{videoFromApi.title}</strong>
              <p>{videoFromApi.views} vizualizações</p>
            </Title>

            <UserInfo>
              <img
                src={videoFromApi.user?.avatar_url}
                alt={videoFromApi.user?.name}
              />
              <strong>{videoFromApi.user?.name}</strong>
            </UserInfo>

            <Description>
              <p>{videoFromApi.description}</p>
            </Description>
          </VideoInfo>
        </div>
      </Content>
    </>
  );
};

export default ShowVideo;
