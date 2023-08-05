import React from 'react';
import s from './GeneralLayout.module.css';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
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
          {/* <iframe
            src="http://localhost:3000/chatbot-iframe/64ce0e09b8796e0baa72eebb"
            width="100%"
            style={{ height: '100%', minHeight: '700px' }}
            id="godman-chatbot"
            title="hi"
          ></iframe>
          <script
            src="http://localhost:5050/static/scripts/embed-script.js"
            defer
          ></script> */}
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div
          className={'h-screen justify-between flex flex-col '}
          style={{ height: '100vh' }}
        >
          <Header />
          <main>{children}</main>
        </div>
        <Footer />
      </IntlProvider>
    </>
  );
};
