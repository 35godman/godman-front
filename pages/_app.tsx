import { AppProps } from 'next/app';
import React from 'react';
import '../styles.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
