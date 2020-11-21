import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/siginUp" component={SignUp} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/deshboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
/*  Aqui o component Route foi rescrevido para evitar que ficasse se repitindo
 ** a logica para verificar se o usuário ja estava logado ou não.
 */
