import styled from 'styled-components';

export const Content = styled.div`
  > div {
    margin: 4rem auto;
    width: 90vw;
  }

  @media (min-width: 700px) {
    > div {
      width: 70rem;
    }
  }

  @media (min-width: 1000px) {
    > div {
      width: 100rem;
    }
  }
`;

export const VideoInfo = styled.div`
  color: #333;
  background: #fff;

  border-radius: 0 0 1rem 1rem;

  strong {
    font: 2rem 'Poppins', sans-serif;
    font-weight: bold;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  border-bottom: 1px solid #eee;

  @media (min-width: 700px) {
    padding: 1rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  margin: 1rem;

  img {
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
  }

  strong {
    margin-left: 2rem;
  }
`;

export const Description = styled.div`
  padding: 0 1rem;
  text-align: left;
`;
