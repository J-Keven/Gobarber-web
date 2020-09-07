import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/Global';
import Routes from './Routes';
import { AuthProvide } from './context/authContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvide>
          <Routes />
        </AuthProvide>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
