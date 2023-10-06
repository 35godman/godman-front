import React from 'react';
import MainPage from '@/entities/MainPage/MainPage';
import Head from 'next/head';

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
