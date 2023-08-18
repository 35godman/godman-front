import React from 'react';
import { Login } from '@/features/Login/Login';
import { RegistrationForm } from '@/features/Register';

const index = () => {
  const tabs = [
    { key: 'login', label: 'Login', children: <Login /> },
    {
      key: 'register',
      label: 'Registration',
      children: <RegistrationForm />,
    },
  ];

  return (
    // <div className={s.loginWrapper}>
    //   <Tabs defaultActiveKey="login" centered items={tabs} />
    // </div>
    <></>
  );
};
export default index;
