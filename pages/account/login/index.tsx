import React from 'react';
import { Login } from '@/features/Login/ui/Login';
import { RegistrationForm } from '@/features/Register';
import { Tabs } from 'antd';

const LoginPage = () => {
  const [activeKey, setActiveKey] = React.useState('login');
  const tabs = [
    { key: 'login', label: 'Login', children: <Login /> },
    {
      key: 'register',
      label: 'Registration',
      children: (
        <RegistrationForm
          onSuccess={() => {
            setActiveKey('login');
          }}
        />
      ),
    },
  ];

  return (
    <>
      <div className={'max-w-full max-h-screen '}>
        <Tabs
          defaultActiveKey="login"
          centered
          items={tabs}
          onChange={(activeKey) => setActiveKey(activeKey)}
          activeKey={activeKey}
        />
      </div>
    </>
  );
};
export default LoginPage;
