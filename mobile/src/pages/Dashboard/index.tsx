import React from 'react';
import {
  VideosList,
  Video,
  VideoThumbnail,
  InfoContainer,
  AvatarImage,
  Title,
  Views,
} from './styles';

const Dashboard: React.FC = () => (
  <>
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

          <Title>Título do vídeo</Title>
          <Views>10000 vizualizações</Views>
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

          <Title>Título do vídeo</Title>
          <Views>10000 vizualizações</Views>
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

          <Title>Título do vídeo</Title>
          <Views>10000 vizualizações</Views>
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

          <Title>Título do vídeo</Title>
          <Views>10000 vizualizações</Views>
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

          <Title>Título do vídeo</Title>
          <Views>10000 vizualizações</Views>
        </InfoContainer>
      </Video>
    </VideosList>
  </>
);

export default Dashboard;
