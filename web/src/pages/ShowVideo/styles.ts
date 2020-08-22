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
