import React, { useCallback, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FiChevronLeft, FiPlus } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

import { VideoInfo } from '../Dashboard/index';

import {
  Container, Header, Content, ButtonContainer, Video,
} from './styles';

interface DeleteVideo {
  video_id: string;
}

const Studio :React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();

  const [userVideos, setUserVideos] = useState<VideoInfo[]>([]);

  useEffect(() => {
    async function loadUserVideoData() {
      const response = await api.get<VideoInfo[]>(`videos/channel/${user.id}`);

      setUserVideos(response.data);
    }

    loadUserVideoData();
  }, [user.id]);

  const handleCreateVideo = useCallback(async () => {
    const response = await api.post('videos');
    const video = response.data;

    history.push(`/studio/create/${video.id}`);
  }, [history]);

  const handleEditVideo = useCallback(async (video_id:string) => {
    history.push(`/studio/edit/${video_id}`);
  }, [history]);

  const handleDeleteVideo = useCallback(async (video_id:string) => {
    await api.delete('videos', {
      data: {
        video_id,
      },
    });

    setUserVideos((state) => (state.filter((video) => video.id !== video_id)));
  }, []);

  return (
    <Container>
      <Header>
        <Link to="/">
          <FiChevronLeft size={30} />
        </Link>

        <Link to="/profile">
          {user.avatar_url ? (<img src={user.avatar_url} alt={user.name} />) : <FaUserCircle />}
        </Link>

      </Header>

      <Content>
        <div>
          <h1>Meus vídeos</h1>
          <button type="button" onClick={handleCreateVideo}>

            <FiPlus />
            <strong>Criar vídeo</strong>
          </button>
        </div>

        {userVideos.map((video) => (
          <Video key={video.id}>
            <img src={video.video_thumbnail} alt={video.title} />
            <div>
              <strong>{video.title}</strong>
              <ButtonContainer>

                <button type="button" onClick={() => handleEditVideo(video.id)}>
                  <FaEdit color="#3052d9" />
                </button>

                <button type="button" onClick={() => handleDeleteVideo(video.id)}>
                  <FaTrashAlt color="red" />
                </button>
              </ButtonContainer>
            </div>
          </Video>

        ))}
      </Content>
    </Container>
  );
};

export default Studio;
