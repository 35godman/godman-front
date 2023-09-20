import React from 'react';
import { Login } from '@/features/Login/ui/Login';
import { RegistrationForm } from '@/features/Register';
import { Tabs } from 'antd';

const LoginPage = () => {
  const tabs = [
    { key: 'login', label: 'Login', children: <Login /> },
    {
      key: 'register',
      label: 'Registration',
      children: <RegistrationForm />,
    },
  ];

  return (
    <>
      <div className={'max-w-full max-h-screen '}>
        <Tabs defaultActiveKey="login" centered items={tabs} />
      </div>
    </>
  );
};
export default LoginPage;
