import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FiChevronLeft, FiPlus } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';

import {
  Container, Header, Content, ButtonContainer, Video,
} from './styles';

const Studio :React.FC = () => {
  const { user } = useAuth();

  const handleDeleteVideo = useCallback(() => {

  }, []);

  const handleEditVideo = useCallback(() => {

  }, []);

  const handleAddVideo = useCallback(() => {

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
          <button type="button" onClick={handleAddVideo}>

            <FiPlus />
            <strong>Criar vídeo</strong>
          </button>
        </div>
        <Video>
          <img src="https://thumbs.dreamstime.com/b/imagem-de-fundo-bonita-do-c%C3%A9u-da-natureza-64743176.jpg" alt="video_thumb" />
          <div>
            <strong>Titulo do video muito massa que contém mais de 1 linha</strong>
            <ButtonContainer>
              <button type="button" onClick={handleDeleteVideo}>
                <FaTrashAlt />
              </button>

              <button type="button" onClick={handleEditVideo}>
                <FaEdit />
              </button>
            </ButtonContainer>
          </div>
        </Video>

        <Video>
          <img src="https://thumbs.dreamstime.com/b/imagem-de-fundo-bonita-do-c%C3%A9u-da-natureza-64743176.jpg" alt="video_thumb" />
          <div>
            <strong>Titulo do video muito massa que contém mais de 1 linha</strong>
            <ButtonContainer>
              <button type="button" onClick={handleDeleteVideo}>
                <FaTrashAlt />
              </button>

              <button type="button" onClick={handleEditVideo}>
                <FaEdit />
              </button>
            </ButtonContainer>
          </div>
        </Video>

        <Video>
          <img src="https://thumbs.dreamstime.com/b/imagem-de-fundo-bonita-do-c%C3%A9u-da-natureza-64743176.jpg" alt="video_thumb" />
          <div>
            <strong>Titulo do video muito massa que contém mais de 1 linha</strong>
            <ButtonContainer>
              <button type="button" onClick={handleDeleteVideo}>
                <FaTrashAlt />
              </button>

              <button type="button" onClick={handleEditVideo}>
                <FaEdit />
              </button>
            </ButtonContainer>
          </div>
        </Video>

        <Video>
          <img src="https://thumbs.dreamstime.com/b/imagem-de-fundo-bonita-do-c%C3%A9u-da-natureza-64743176.jpg" alt="video_thumb" />
          <div>
            <strong>Titulo do video muito massa que contém mais de 1 linha</strong>
            <ButtonContainer>
              <button type="button" onClick={handleDeleteVideo}>
                <FaTrashAlt />
              </button>

              <button type="button" onClick={handleEditVideo}>
                <FaEdit />
              </button>
            </ButtonContainer>
          </div>
        </Video>
      </Content>
    </Container>
  );
};

export default Studio;
