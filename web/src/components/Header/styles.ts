import styled from 'styled-components';

export const Container = styled.header`
  height: 6rem;
  width: 100vw;
  background: #fff;
  display: flex;
`;

export const HeaderContainer = styled.div`
  width: 90vw;
  display: flex;
  margin: 0 auto;

  align-items: center;
  justify-content: space-between;

  svg {
    width: 3.5rem;
    height: 3.5rem;
  }

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

  align-items: center;

  > a {
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
    }

    >svg {
      color: #eee;
    }
  }
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
