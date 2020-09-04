import React, { useCallback } from 'react';
import { TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

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
  Title,
  Views,
} from './styles';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const handleSearch = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  const handleGoVideo = useCallback(() => {
    navigation.navigate('Video');
  }, [navigation]);
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
        <Video>
          <TouchableWithoutFeedback onPress={handleGoVideo}>
            <VideoThumbnail
              source={{
                uri:
                  'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
              }}
            />
            <InfoContainer>
              <AvatarImage
                source={{
                  uri:
                    'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
                }}
              />

              <Title numberOfLines={1}>Título do vídeo muito longo </Title>
              <Views numberOfLines={1}>10000000 vizualizações</Views>
            </InfoContainer>
          </TouchableWithoutFeedback>
        </Video>
      </VideosList>
    </>
  );
};

export default Dashboard;
