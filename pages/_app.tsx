import { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import store from '@/app/store/store';
import { Layout } from '../layouts/Layout';
import { App } from '@/app/App';

function MyApp({ Component, pageProps }: AppProps) {
  const { noLayout, ...rest } = pageProps;

  /**
   * @COMMENT had a strange error here, don't know what has cause it
   */
  //eslint-disable-next-line
  const AnyComponent = Component as any;

  return (
    <App>
      {noLayout ? (
        <>
          <AnyComponent {...rest} />
        </>
      ) : (
        <Layout>
          <>
            <AnyComponent {...rest} />
          </>
        </Layout>
      )}
    </App>
  );
}

export default MyApp;
