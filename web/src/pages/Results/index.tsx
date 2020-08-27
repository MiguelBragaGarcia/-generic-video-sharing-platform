import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { Container, VideoResult, Info, Description } from './styles';
import Header from '../../components/Header';
import api from '../../services/api';

interface SearchParams {
  search: string;
}

interface User {
  id: string;
  name: string;
  avatar_url: string;
}

interface VideoResults {
  id: string;
  title: string;
  description: string;
  views: number;
  video_url: string;
  video_thumbnail: string;
  user: User;
}

const Results: React.FC = () => {
  const queryParams = window.location.search;

  const [results, setResults] = useState<VideoResults[]>();

  const formattedString = useCallback(
    (data: string) => data.replace(/\?search=|%/g, ' '),
    [],
  );

  useEffect(() => {
    async function loadResults() {
      const response = await api.post('/search', {
        searchTags: formattedString(queryParams),
      });

      setResults(response.data);
    }

    loadResults();
  }, [formattedString, queryParams]);

  return (
    <>
      <Header />

      <Container>
        {results?.map((result) => (
          <Link key={result.id} to={`/video/${result.id}`}>
            <VideoResult>
              <img src={result.video_thumbnail} alt={result.title} />

              <div>
                <strong>{result.title}</strong>

                <Info>
                  <p>{result.user.name}</p>
                  <p>{result.views} vizualizações</p>
                </Info>

                <Description>{result.description}</Description>
              </div>
            </VideoResult>
          </Link>
        ))}
      </Container>
    </>
  );
};

export default Results;
