import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { USER_FRAGMENT } from 'graphql/fragments/user';

export interface IProps {
  component: React.FC<RouteComponentProps>;
  path: Array<string> | string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<IProps> = ({
  component: Component,
  path,
  exact,
}: IProps) => {
  const client = useApolloClient();
  const user = client.cache.readFragment<{
    id: number;
    email: string;
    username: string;
  }>({
    fragment: USER_FRAGMENT,
  });
  return (
    <Route
      path={path}
      exact={exact}
      render={(props: RouteComponentProps) =>
        user ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default ProtectedRoute;