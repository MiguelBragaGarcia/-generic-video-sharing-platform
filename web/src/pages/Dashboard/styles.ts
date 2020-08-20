import styled from 'styled-components';

export const Header = styled.header`
  height: 6rem;
  width: 100vw;
  background: #fff;
  display: flex;
  justify-content: center;
`;

export const HeaderContainer = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
  }
`;

export const MainPageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border-style: none;
  background: none;
  margin-right: 2rem;

  img {
    height: 4rem;
    width: 4rem;
  }
`;

export const SearchBar = styled.div`
  display: flex;

  input {
    width: 17rem;
    height: 4.5rem;
    border-radius: 1rem 0 0 1rem;
    padding: 0.2rem 1rem;
    border-style: none;
    background: #eee;
    color: #38393d;
  }

  button {
    height: 4.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 1rem;

    background: #3052d9;
    border-style: none;
    border-radius: 0 1rem 1rem 0;
  }

  @media (min-width: 700px) {
    input {
      width: 40rem;
    }
  }
`;

export const ButtonActionsContainer = styled.div`
  display: flex;
`;

export const SendVideoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 1rem;
  background: none;
  border-style: none;

  @media (min-width: 700px) {
    margin-right: 3rem;
  }
`;

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 4.5rem;
  background: transparent;
  border-radius: 1rem;
  border-style: none;
  border: 1px solid #3052d9;

  padding: 0.5rem;

  color: #3052d9;

  svg {
    margin-right: 0.5rem;
  }
`;

export const Content = styled.div`
  display: flex;
  /* justify-content: center; */
`;

export const VideoContainer = styled.div`
  margin: 3rem auto;

  display: grid;

  grid-template-columns: 42rem;

  @media (min-width: 850px) {
    grid-template-columns: repeat(2, 42rem);
    gap: 2rem;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 42rem);
    gap: 2rem;
  }
`;

export const Video = styled.button`
  border-style: none;
  background: #fff;
  border-radius: 0 0 1rem 1rem;

  > img {
    width: 42rem;
  }

  & + button {
    margin-top: 2rem;
  }

  @media (min-width: 700px) {
    > img {
      width: 42rem;
    }

    & + button {
      margin-top: 0;
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
