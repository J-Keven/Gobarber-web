import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/Global';
import Routes from './Routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
