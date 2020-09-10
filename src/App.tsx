import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/Global';
import Routes from './Routes';
import Providers from './hooks';

function App() {
  return (
    <>
      <BrowserRouter>
        <Providers>
          <Routes />
        </Providers>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
