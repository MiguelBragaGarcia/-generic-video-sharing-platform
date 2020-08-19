import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
  font-size: 60%
}

body {
  height: 100vh;
  background : #f0f4f5;
  -webkit-font-smoothing: antialiased;
}

body, input, button, textarea {

  font: 1.6rem "Poppins", sans-serif;
}


button {
  cursor: pointer;
}


`;
