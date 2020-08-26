import React from 'react';

import { MdInfo } from 'react-icons/md';
import { Container, Content, VideoResult, Info } from './styles';
import Header from '../../components/Header';

const Results: React.FC = () => (
  <>
    <Header />

    <Container>
      <Content>
        <VideoResult>
          <img
            src="https://www.revistaplaneta.com.br/wp-content/uploads/sites/3/2018/06/12_pl540_unesco1.jpg"
            alt="video_thumb"
          />

          <strong>Exemplo de título de vídeo</strong>

          <Info>
            <img
              src="https://www.revistaplaneta.com.br/wp-content/uploads/sites/3/2018/06/12_pl540_unesco1.jpg"
              alt="user-avatar"
            />
            <div>
              <p>Exemplo de canal</p>
              <p>10000 vizualiações</p>
            </div>
          </Info>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit
            amet mauris rutrum, congue mauris id, egestas ex. Phasellus pretium
            consequat diam at auctor. Donec at viverra mi, a consectetur nunc.
            Quisque ut purus diam. Aenean imperdiet ligula eget odio fringilla
            tempor. Fusce in ullamcorper tellus. Sed felis risus, fermentum nec
            porta nec, mollis ac arcu. Duis dictum urna in ipsum interdum, eu
            commodo sapien facilisis. Suspendisse potenti. Integer egestas ante
            vel tortor laoreet egestas. Etiam semper venenatis ligula, luctus
            bibendum lorem luctus sed. Suspendisse potenti. In accumsan varius
            dui sed semper. Integer eu eros maximus, blandit turpis in, luctus
            enim. Phasellus aliquet vitae magna ac hendrerit. Maecenas consequat
            fermentum ligula, vitae convallis augue feugiat non.{' '}
          </p>
        </VideoResult>
      </Content>
    </Container>
  </>
);

export default Results;
