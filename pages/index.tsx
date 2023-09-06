import React from 'react';
import { Login } from '@/features/Login/ui/Login';
import { RegistrationForm } from '@/features/Register';
import { Tabs } from 'antd';
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
