import React, { useCallback, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';

import {
  Header,
  NormalHeader,
  SearchHeader,
  LogoImage,
  SearchInput,
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

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState('');

  const toggleSearchBar = useCallback(() => {
    setShowSearchBar(state => !state);
  }, []);

  const handleSearch = useCallback(() => {
    navigation.navigate('Search', { search });
  }, [navigation, search]);
  return (
    <>
      <Header>
        {showSearchBar ? (
          <SearchHeader>
            <TouchableHighlight onPress={toggleSearchBar}>
              <Icon name="chevron-left" size={30} color="#333" />
            </TouchableHighlight>
            <SearchInput
              autoFocus
              onChangeText={text => setSearch(text)}
              value={search}
              placeholder="Busque por vídeos"
              returnKeyType="send"
              onSubmitEditing={handleSearch}
            />
          </SearchHeader>
        ) : (
          <NormalHeader>
            <LogoImage source={logoImg} />
            <TouchableHighlight onPress={toggleSearchBar}>
              <Icon name="search" size={30} color="#333" />
            </TouchableHighlight>
          </NormalHeader>
        )}
      </Header>

      <VideosList>
        <Video>
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
        </Video>

        <Video>
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
        </Video>

        <Video>
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
        </Video>

        <Video>
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
        </Video>

        <Video>
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
        </Video>

        <Video>
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
        </Video>
      </VideosList>
    </>
  );
};

export default Dashboard;
