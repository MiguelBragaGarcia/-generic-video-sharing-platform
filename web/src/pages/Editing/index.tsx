import React, {
  useState, useEffect, useCallback, ChangeEvent, FormEvent,
} from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';

import {
  Container, Header, Content, VideoThumbnail,
} from './styles';
import api from '../../services/api';
import { VideoInfo } from '../Dashboard';

interface VideoParams {
  video_id: string;
}

const Editing:React.FC = () => {
  const { params } = useRouteMatch<VideoParams>();
  const { user } = useAuth();
  const history = useHistory();

  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function loadVideoData() {
      const response = await api.get<VideoInfo>(`videos/${params.video_id}`);

      setTitle(response.data.title);
      setDescription(response.data.description);
      setThumbnail(response.data.video_thumbnail);
    }

    loadVideoData();
  }, [params.video_id]);

  const handleUpdateThumbnail = useCallback(async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const data = new FormData();

      data.append('thumbnail', e.target.files[0]);
      data.append('video_id', params.video_id);

      api.patch('videos/thumbnail', data).then((response) => {
        setThumbnail(response.data.video_thumbnail);
      });
    }
  }, [params.video_id]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    await api.put('videos', {
      video_id: params.video_id,
      title,
      description,
    });

    history.push('/');
  }, [title, description, params.video_id, history]);

  return (
    <Container>

      <Header>
        <Link to="/studio">
          <FiChevronLeft size={30} />
        </Link>

        <Link to="/profile">
          {user.avatar_url ? (<img src={user.avatar_url} alt={user.name} />) : <FaUserCircle />}
        </Link>

      </Header>

      <Content>

        <form onSubmit={handleSubmit}>
          <div>
            <p>Edite seu vídeo</p>
          </div>

          <VideoThumbnail>
            <small>Miniatura:</small>
            <label htmlFor="videoThumbnail">
              <img src={thumbnail} alt="" />
              <input type="file" id="videoThumbnail" onChange={handleUpdateThumbnail} />
            </label>

          </VideoThumbnail>

          <input type="text" placeholder="Título do vídeo" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />

          <button type="submit">Confirmar mudanças</button>
        </form>
      </Content>

    </Container>

  );
};

export default Editing;
