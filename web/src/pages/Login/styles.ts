import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;

  form {
    width: 40rem;

    text-align: center;
    justify-content: center;

    h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 4rem;
      color: #333;
      margin-bottom: 1rem;
    }

    button {
      width: 100%;
      margin-top: 2rem;
      height: 5rem;

      background: #3052d9;
      border-style: none;
      border-radius: 2rem;
      color: #f0f4f5;
      font-weight: bold;

      transition: background-color 0.2s linear;

      &:hover {
        background-color: ${darken(0.05, '#3052d9')};
      }
    }

    > a {
      display: block;
      margin-top: 2rem;
      font-size: 1.9rem;
      color: #333;
    }
  }

  > a {
    font-size: 1.9rem;
    color: #3052d9;
    display: block;
    margin-top: 2rem;

    display: flex;
    align-items: center;

    svg {
      margin-right: 0.7rem;
    }
  }

  @media (min-width: 700px) {
    form {
      width: 60rem;
    }
  }
`;
