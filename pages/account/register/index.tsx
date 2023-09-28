import React from 'react';
import { Register } from '@/features/Register';
import { LogIn } from '@/features/Login';

const RegistrationPage = () => {
  return (
    <>
      <div
        className={
          'max-w-full min-h-screen background-dg-blue flex items-center'
        }
      >
        <Register />
      </div>
    </>
  );
};
export async function getServerSideProps() {
  return { props: { noLayout: true } };
}
export default RegistrationPage;
