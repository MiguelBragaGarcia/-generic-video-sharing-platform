import styled from 'styled-components';

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
  margin: 2rem auto 0;



  > div {
    margin-bottom: 1rem;
    display:flex;
    justify-content: space-between;
    align-items: center;


    h1 {
      font: 2rem "Poppins";
      font-weight: bold;
      color: #333;
    }

    > button {
      display:flex;
      align-items: center;


      background: #3052d9;
      border-style: none;
      padding: 1rem;
      border-radius: 1rem;
      color: #fff;

      svg {
        margin-right:1rem;
        height: 2rem;
        width: 2rem;
      }
    }
  }
`;

export const Video = styled.div`
  display:flex;

  background: #fff;


  border-radius: 0 1rem 1rem 0;

  img {
    width: 25rem;
    height: 15rem;
  }

  & + div {
    margin-top: 2rem;
  }

  > div {
    width: 100%;
    strong {

      color: #333;
      font-size: 1.6rem;


      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }


      padding: 1rem;

  }

  @media(min-width: 700px) {
    > div {
        strong {
          -webkit-line-clamp: 1;
        }
    }
  }

`;

export const ButtonContainer = styled.div`

display:flex;
flex-direction: row;
margin-top: 1rem;
justify-content: space-between;

button {
    border-style:none;
    background: transparent;
    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

`;
