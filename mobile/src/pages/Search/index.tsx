import React, { useCallback, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

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
import api from '../../services/api';

import { VideoInfo } from '../Dashboard/index';

const Search: React.FC = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<VideoInfo[]>();
  const [showResults, setShowResults] = useState(false);

  const { goBack, navigate } = useNavigation();

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleGoVideo = useCallback(
    (video_id: string) => {
      navigate('Video', { video_id });
    },
    [navigate],
  );

  const handleSearch = useCallback(async () => {
    const response = await api.post<VideoInfo[]>('search', {
      searchTags: search,
    });

    setResults(response.data);

    if (!showResults) {
      setShowResults(state => !state);
    }
  }, [search, showResults]);

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
        {showResults &&
          results?.map(result => (
            <Video>
              <TouchableWithoutFeedback
                onPress={() => handleGoVideo(result.id)}
              >
                <View style={{ flexDirection: 'row' }}>
                  <VideoThumbnail
                    source={{
                      uri: result.video_thumbnail,
                    }}
                  />

                  <InfoContainer>
                    <Title numberOfLines={2}>{result.title}</Title>
                    <Description numberOfLines={3}>
                      {result.description}
                    </Description>

                    <Views numberOfLines={1}>
                      {result.views} vizualizações
                    </Views>
                  </InfoContainer>
                </View>
              </TouchableWithoutFeedback>
            </Video>
          ))}
      </ResultsList>
    </Container>
  );
};

export default Search;
