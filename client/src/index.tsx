import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'App';
import { AppProvider } from 'Context';
import { ApolloProvider } from '@apollo/client';
import { client } from 'Apollo';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme';
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
