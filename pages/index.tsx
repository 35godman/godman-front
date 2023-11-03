import React from 'react';
import MainPage from '@/entities/MainPage/MainPage';
import Head from 'next/head';
import { PrivacyPolicy } from '@/entities/MainPage/PrivacyPolicy/PrivacyPolicy';
import { PAGE404 } from '@/entities/UI/404/404';
import { ContactTeam } from '@/entities/MainPage/ContactTeam/ContactTeam';

const index = () => {
  return (
    <>
      <MainPage />
    </>
  );
};
export async function getServerSideProps() {
  return { props: { noLayout: true } };
}

export default index;
