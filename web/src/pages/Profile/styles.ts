import styled from 'styled-components';
import { shade, darken } from 'polished';

export const Container = styled.div`
  width: 90vw;
  margin: 0 auto;
  background: #fff;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;

  border-bottom: 1px solid #eee;

  > svg {
    color: #3052d9;
  }

  button {
    border-style: none;
    background: transparent;

    svg {
      color: red;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;

  justify-content: center;
  align-items: center;

  h1 {
    font: 3rem 'Poppins';
    font-weight: bold;
    color: #38393d;
    margin-bottom: 1rem;
  }

  button {
    height: 5rem;
    margin: 2rem 0;
    width: 100%;
    border-style: none;
    background: #3052d9;

    color: #fff;
    font-weight: bold;

    padding: 1rem;
    border-radius: 2rem;

    transition: background-color 0.2s linear;

    &:hover {
      background-color: ${darken(0.05, '#3052d9')};
    }
  }

  @media (min-width: 700px) {
    input {
      width: 55rem;
    }
  }
`;
export const AvatarInput = styled.div`
  display: flex;
  justify-content: center;

  margin: 2rem 0;
  position: relative;

  img {
    width: 30rem;
    height: 30rem;
    border-radius: 50%;
  }

  > svg {
    border: 0.4rem dashed #333;
    width: 30rem;
    height: 30rem;
    border-radius: 50%;
    color: #eee;
  }

  label {
    position: absolute;
    width: 6rem;
    height: 6rem;
    background: #fff;
    border-radius: 50%;
    right: calc(50% - 10rem);
    bottom: 0;
    border: 1px solid #eee;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    transition: background 0.2s linear;

    input {
      display: none;
    }

    svg {
      width: 3rem;
      height: 3rem;
      color: #3052d9;
      background: transparent;
    }

    &:hover {
      background: ${shade(0.07, '#fff')};
    }
  }
`;
