import React, { useCallback, useState, useEffect } from 'react';
import { TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Icon as IconFA } from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import logoImg from '../../assets/logo.png';

import {
  Header,
  NormalHeader,
  LogoImage,
  VideosList,
  Video,
  VideoThumbnail,
  InfoContainer,
  AvatarImage,
  AvatarSVG,
  Title,
  Views,
} from './styles';
import api from '../../services/api';

interface User {
  id: string;
  name: string;
  avatar_url: string;
}

export interface VideoInfo {
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
  const navigation = useNavigation();

  useEffect(() => {
    async function loadVideoFromApi() {
      const response = await api.get<VideoInfo[]>('videos', {
        params: {
          page: 1,
        },
      });

      setVideos(response.data);
    }

    loadVideoFromApi();
  }, []);

  const handleSearch = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  const handleGoVideo = useCallback(
    (video_id: string) => {
      navigation.navigate('Video', {
        video_id,
      });
    },
    [navigation],
  );
  return (
    <>
      <Header>
        <NormalHeader>
          <LogoImage source={logoImg} />
          <TouchableHighlight onPress={handleSearch}>
            <Icon name="search" size={30} color="#333" />
          </TouchableHighlight>
        </NormalHeader>
      </Header>

      <VideosList>
        {videos.map(video => (
          <Video key={video.id}>
            <TouchableWithoutFeedback onPress={() => handleGoVideo(video.id)}>
              <VideoThumbnail
                source={{
                  uri: video.video_thumbnail,
                }}
              />
              <InfoContainer>
                {video.user.avatar_url ? (
                  <AvatarImage
                    source={{
                      uri: video.user.avatar_url,
                    }}
                  />
                ) : (
                  <AvatarSVG name="user-circle" size={40} />
                )}

                <Title numberOfLines={1}>{video.title}</Title>
                <Views numberOfLines={1}>{video.views} vizualizações</Views>
              </InfoContainer>
            </TouchableWithoutFeedback>
          </Video>
        ))}
      </VideosList>
    </>
  );
};

export default Dashboard;
