import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 90vw;
  margin: 3rem auto;

  a {
    text-decoration: none;
    color: #333;

    margin: 1rem 0;
  }
`;

export const VideoResult = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  background: #fff;
  border-radius: 0 1rem 1rem 0;

  transition: transform 0.2s linear;

  &:hover {
    transform: translateX(1rem);
  }

  img {
    width: 25rem;
    height: 15rem;
  }

  > div {
    padding: 0 1rem;

    strong {
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    p {
      font-size: 1.4rem;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;

  margin-bottom: 1rem;

  p + p {
    margin-left: 1rem;
  }
`;

export const Description = styled.p`
  width: calc(90vw - 27rem);

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;

  @media (min-width: 700px) {
    -webkit-line-clamp: 3;
  }
`;
