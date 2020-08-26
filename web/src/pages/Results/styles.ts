import styled from 'styled-components';

export const Container = styled.div`
  width: 90vw;
  margin: 4rem auto;
`;

export const Content = styled.div``;
export const VideoResult = styled.div`
  display: flex;
  flex-direction: column;

  background: #fff;

  img {
    width: 90vw;
    height: 20rem;

    margin-bottom: 1rem;
  }

  strong {
    margin: 0rem 0 1rem 0;
  }

  > p {
    display: none;
  }

  @media (min-width: 700px) {
    flex-direction: row;

    > p {
      display: block;
    }
  }
`;

export const Info = styled.div`
  display: flex;

  img {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex: 1;
    justify-content: space-between;

    margin-left: 1rem;

    margin-bottom: 1rem;
    align-items: center;
  }
`;
