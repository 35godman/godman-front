import React from 'react';
import { Button } from 'antd';
import s from './RegiserButton.module.css';
import { useRouter } from 'next/router';
const RegisterButton = () => {
  const router = useRouter();
  const goToRegisterPage = async () => {
    await router.push('/account/login');
  };
  return (
    <>
      <Button className={s.signUpButton} onClick={goToRegisterPage}>
        Sign Up Free
      </Button>
    </>
  );
};

export default RegisterButton;
