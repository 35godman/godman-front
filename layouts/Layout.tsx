import React, { useEffect } from 'react';
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
        <div className={s.layoutFlex}>
          <Header />
          <main className={s.generalWrapper}>{children}</main>

          <Footer />
        </div>
      </IntlProvider>
    </>
  );
};
