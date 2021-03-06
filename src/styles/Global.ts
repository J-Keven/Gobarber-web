import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }

  body {
    background:   #312E38;
    --webkit-font-smoothing: antialiased;

  }

  body, input, button {
    border-style: none;
    font: 16px 'Roboto Slab', serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    font: 16px 'Roboto Slab', serif;

  }

  button {
    cursor: pointer;
  }
`;
