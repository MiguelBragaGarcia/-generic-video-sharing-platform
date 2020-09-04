import React, { useCallback, useState, useEffect } from 'react';
import { TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  SearchHeader,
  SearchInput,
  Container,
  ResultsList,
  Video,
  VideoThumbnail,
  InfoContainer,
  Title,
  Description,
  Views,
} from './styles';

const Search: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);

  const route = useRoute();
  const { goBack, navigate } = useNavigation();

  // Carregar o inicio com useEffect.

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleGoVideo = useCallback(() => {
    navigate('Video');
  }, [navigate]);

  const handleSearch = useCallback(async () => {
    setShowResults(state => !state);
  }, []);

  return (
    <Container>
      <SearchHeader>
        <TouchableHighlight onPress={handleGoBack}>
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

      <ResultsList>
        {showResults && (
          <>
            <Video>
              <TouchableWithoutFeedback onPress={handleGoVideo}>
                <View style={{ flexDirection: 'row' }}>
                  <VideoThumbnail
                    source={{
                      uri:
                        'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
                    }}
                  />

                  <InfoContainer>
                    <Title numberOfLines={2}>
                      Teste de título com mais de duas linhas para realizar o
                      line clamp
                    </Title>
                    <Description numberOfLines={3}>
                      Descrição do vídeo, muito grande para ocupar varias linhas
                    </Description>

                    <Views numberOfLines={1}>1000000 vizualizações</Views>
                  </InfoContainer>
                </View>
              </TouchableWithoutFeedback>
            </Video>
          </>
        )}
      </ResultsList>
    </Container>
  );
};

export default Search;
