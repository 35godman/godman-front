import { AppProps } from 'next/app';
import React from 'react';
import '../styles.css';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { Layout } from '../layouts/Layout';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
