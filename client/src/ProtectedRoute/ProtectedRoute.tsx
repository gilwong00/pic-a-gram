import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { ME } from 'graphql/user/queries';

export interface IProps {
  component: React.FC<RouteComponentProps>;
  path: Array<string> | string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<IProps> = ({
  component: Component,
  path,
  exact
}: IProps) => {
  const client = useApolloClient();
  const user = client.readQuery({
    query: ME
  });

  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps) =>
        user?.me ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default ProtectedRoute;
