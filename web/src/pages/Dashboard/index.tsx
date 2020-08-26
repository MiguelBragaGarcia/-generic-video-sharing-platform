import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import api from '../../services/api';
import { Content, VideoContainer, Video, VideoInfo } from './styles';

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
      <Header />
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
