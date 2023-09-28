import React from 'react';
import MainPage from '@/entities/MainPage/MainPage';

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
