import React, { createContext } from 'react';
import { useQuery } from '@apollo/client';
import { ME } from 'graphql/user/queries';

export interface IUser {
  id: string;
  email: string;
  username: string;
}

interface IAppContext {
  user: IUser | null;
  loading: boolean;
}

export const AppContext = createContext<IAppContext>({
  user: null,
  loading: false
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, loading } = useQuery(ME);

  const context: IAppContext = {
    user: data?.me,
    loading
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
