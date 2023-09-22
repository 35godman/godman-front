import React from 'react';
import { Header } from '@/entities/Header/Header';
import Head from 'next/head';
import { IntlProvider } from 'react-intl';
import ru from '@/../lang/ru.json';
type Props = {
  children: React.ReactNode;
};
export const Layout: React.FC<Props> = ({ children }) => {
  const messages = ru as typeof ru;

  return (
    <>
      <IntlProvider locale={'ru'} messages={messages}>
        <Head>
          <title>{}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Header />
        <div
          className={'h-screen justify-between flex flex-col mt-20'}
          style={{ height: '100vh' }}
        >
          <main>{children}</main>
        </div>
      </IntlProvider>
    </>
  );
};
