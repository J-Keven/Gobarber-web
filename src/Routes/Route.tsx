import React from 'react';
import {
  Redirect,
  Route as RouteDOM,
  RouteProps as RouteDOMProps,
} from 'react-router-dom';
import { useAuth } from '../hooks/authContext';

// [x] - privada/usuario - ok, deixa passar
// [ ] - privada/!users - Login
// [ ] - !privada/usuario - deshboard
// [x] - !privada/!usuario - ok, deixa passar

interface RouteProps extends RouteDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <RouteDOM
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
