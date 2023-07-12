import { AppProps } from 'next/app';
import React from 'react';
import '../styles.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import GeneralLayout from '../layouts/GeneralLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GeneralLayout>
        <Component {...pageProps} />
      </GeneralLayout>
    </Provider>
  );
}

export default MyApp;
