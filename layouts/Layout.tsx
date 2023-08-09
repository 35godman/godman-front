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
        <iframe
          src="https://godman.tech/chatbot-iframe/64cd0ca018e6d0abf364f209"
          width="100%"
          style={{ height: '100%', minHeight: '700px' }}
          id="godman-chatbot"
          title={'godman.chatbot'}
        ></iframe>
      </IntlProvider>
    </>
  );
};
