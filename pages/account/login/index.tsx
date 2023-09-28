import React from 'react';
import { LogIn } from '@/features/Login';
const LoginPage = () => {
  return (
    <>
      <div
        className={
          'max-w-full min-h-screen background-dg-blue flex items-center'
        }
      >
        <LogIn />
      </div>
    </>
  );
};
export async function getServerSideProps() {
  return { props: { noLayout: true } };
}

export default LoginPage;
