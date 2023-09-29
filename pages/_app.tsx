import { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import store from '@/app/store/store';
import { Layout } from '../layouts/Layout';
import { App } from '@/app/App';
import ru from '../lang/ru.json';
import en from '../lang/en.json';
import { IntlProvider } from 'react-intl';

function MyApp({ Component, pageProps }: AppProps) {
  const { noLayout, ...rest } = pageProps;
  const messages = en as typeof en;
  /**
   * @COMMENT had a strange error here, don't know what has cause it
   */
  //eslint-disable-next-line
  const AnyComponent = Component as any;

  return (
    <App>
      {noLayout ? (
        <>
          <IntlProvider locale={'ru'} messages={messages}>
            <AnyComponent {...rest} />
          </IntlProvider>
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
