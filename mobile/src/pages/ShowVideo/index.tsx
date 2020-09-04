import React from 'react';
import { Dimensions } from 'react-native';

import Video from 'react-native-video';

import {
  Container,
  VideoContainer,
  Info,
  Title,
  Views,
  Description,
} from './styles';

import videoFile from '../../assets/Musica-de-teste.mp4';

const ShowVideo: React.FC = () => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <Container>
      <VideoContainer>
        <Video
          source={videoFile}
          style={{ width: windowWidth, height: 300 }}
          controls
        />
      </VideoContainer>

      <Info>
        <Title>Um titulo muito longo para bugar as linhas</Title>

        <Views>1000000 Vizualizações</Views>
      </Info>

      <Description>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </Description>
    </Container>
  );
};

export default ShowVideo;
