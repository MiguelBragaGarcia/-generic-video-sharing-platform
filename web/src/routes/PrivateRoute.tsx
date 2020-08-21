import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/Auth';

interface ExtendRouteProps extends RouteProps {
  component: React.FC;
}

const PrivateRoute: React.FC<ExtendRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
