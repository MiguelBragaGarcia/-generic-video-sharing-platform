import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
`;

export const Header = styled.div`


  height: 6rem;
  display:flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;

  padding: 1rem 5vw;

  a {
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
    }

    svg {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
`;

export const Content = styled.div`
  width: 90vw;
  margin: 4rem auto;

  display:flex;
  flex-direction: column;
  align-items: center;





  form {
    padding: 2rem;
    display:flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    background: #fff;

    div{
      width: 100%;
      p{
        width: 100%;
        font-size: 2rem;
        color: #333;
      }
    }

    input {
      margin-top: 2rem;
      width: 100%;
      padding: 0.5rem 1rem;
      height: 5rem;
      border: 0.3rem solid #eee;
      border-radius: 1rem;
      color: #38393d;
    }

    textarea {
      margin-top: 2rem;
      padding: 1rem;
      max-width: 100%;
      width: 100%;
      max-height: 15rem;
      height: 15rem;


      border: 0.3rem solid #eee;
      border-radius: 1rem;


    }

    button {
      margin-top: 2rem;
      border-radius: 1rem;
      background: #3052d9;
      border-style: none;
      padding: 1rem;
      width: 100%;
      color: #fff;
      font-weight: bold;
      font-size: 1.5rem;

      transition: background-color 0.2s linear;

      &:hover {
        background-color: ${darken(0.05, '#3052d9')};
      }
    }
  }

  @media (min-width: 700px) {
    form {
      width: 70rem;
    }
  }

`;

export const VideoThumbnail = styled.div`
  margin: 1rem 0;
  width: 100%;

  small {
    font: 1.3rem "Poppins" ;
    color: #333;
    font-weight: bold;
  }


  input {
    display: none;
  }

  img {
    cursor: pointer;

    width: 100%;
    height: 20rem;
  }

  svg {
    cursor: pointer;

    width: 100%;
    height: 20rem;
  }

  @media (min-width: 700px) {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;



    img {
      width: 40rem;
      height: 20rem;
    }

    svg {


    width: 40rem;
    height: 20rem;
  }
  }

`;

export const Video = styled.div`
margin: 1rem 0;
  width: 100%;

  small {
    font: 1.3rem "Poppins" ;
    color: #333;
    font-weight: bold;
  }


  input {
    display: none;
  }

  img {
    cursor: pointer;

    width: 100%;
    height: 20rem;
  }

  svg {
    border: 1px solid #333;
    padding: 3rem;
    color: #333;
    cursor: pointer;

    width: 100%;
    height: 20rem;
  }

  @media (min-width: 700px) {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    svg {
      width: 40rem;
      height: 20rem;
    }
  }


`;
