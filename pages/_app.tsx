import { AppProps } from 'next/app';
import React from 'react';
import '@/styles/global.css';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import store from '@/features/store';
import { Layout } from '../layouts/Layout';
function MyApp({ Component, pageProps }: AppProps) {
  const { noLayout, ...rest } = pageProps;
  return (
    <Provider store={store}>
      <NextNProgress />
      {noLayout ? (
        <Component {...rest} />
      ) : (
        <Layout>
          <Component {...rest} />
        </Layout>
      )}
    </Provider>
  );
}

export default MyApp;
