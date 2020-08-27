import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
`;

export const VideoContainer = styled.div`
  margin: 3rem auto;

  a {
    text-decoration: none;
    color: #333;

    & + a {
      margin-top: 2rem;
    }
  }

  display: grid;

  grid-template-columns: 42rem;

  @media (min-width: 850px) {
    grid-template-columns: repeat(2, 42rem);
    gap: 2rem;
    a + a {
      margin-top: 0;
    }
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 42rem);
    gap: 2rem;
  }
`;

export const Video = styled.div`
  border-style: none;
  background: #fff;
  border-radius: 0 0 1rem 1rem;
  transition: transform 0.2s linear;

  &:hover {
    transform: translateY(-1rem);
  }
  > img {
    height: 42rem;
    width: 42rem;
  }

  @media (min-width: 700px) {
    > img {
      width: 42rem;
    }
  }
`;

export const VideoInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding: 0.2rem 1rem;

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }

  div {
    flex: 1;
    margin-left: 2rem;
    text-align: left;

    strong {
      width: 33rem;
      font-weight: bold;
      font-family: 'Poppins';
      font-size: 1.6rem;
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    p {
      color: #333;
    }
  }
`;
