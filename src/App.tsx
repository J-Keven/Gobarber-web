import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/Global';
import Routes from './Routes';
import { AuthProvide } from './hooks/authContext';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvide>
          <Routes />
        </AuthProvide>
      </BrowserRouter>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
}

export default App;
