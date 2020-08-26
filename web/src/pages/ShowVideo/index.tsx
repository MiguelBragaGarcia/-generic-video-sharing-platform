import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useRouteMatch } from 'react-router-dom';

import { Content, VideoInfo, Title, UserInfo, Description } from './styles';

import Header from '../../components/Header';

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
      <Header />

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
