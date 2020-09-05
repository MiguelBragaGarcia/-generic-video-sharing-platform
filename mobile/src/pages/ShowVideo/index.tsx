import React, { useEffect, useState } from 'react';

import Video from 'react-native-video';

import { useRoute } from '@react-navigation/native';
import {
  Container,
  VideoContainer,
  Info,
  Title,
  Views,
  Description,
} from './styles';
import { VideoInfo } from '../Dashboard';
import api from '../../services/api';

interface RouteParams {
  video_id: string;
}

const ShowVideo: React.FC = () => {
  const [video, setVideo] = useState<VideoInfo>();

  const route = useRoute();

  const routeParams = route.params as RouteParams;
  useEffect(() => {
    async function loadVideo() {
      const response = await api.get<VideoInfo>(
        `videos/${routeParams.video_id}`,
      );

      setVideo(response.data);
    }

    loadVideo();
  }, [routeParams.video_id]);

  return (
    <Container>
      <VideoContainer>
        <Video
          source={{
            uri: video?.video_url,
          }}
          style={{ flex: 1 }}
          resizeMode="cover"
          controls
        />
      </VideoContainer>

      <Info>
        <Title>{video?.title}</Title>

        <Views>{video?.views} Vizualizações</Views>
      </Info>

      <Description>{video?.description}</Description>
    </Container>
  );
};

export default ShowVideo;
