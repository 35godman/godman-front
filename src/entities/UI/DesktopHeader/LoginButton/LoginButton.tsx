import React from 'react';
import { Button } from 'antd';
import s from './LoginButton.module.css';

const LoginButton = () => {
  return (
    <>
      <Button className={s.loginButton}>Log in</Button>
    </>
  );
};

export default LoginButton;
