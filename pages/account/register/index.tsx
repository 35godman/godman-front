import React from 'react';
import s from '@/entities/UI/LogIn/LogIn.module.css';
import { Input } from 'antd';
import { BtnUniv } from '@/entities/UI/Buttons/Buttons';
import Link from 'next/link';
import { Register } from '@/features/Register';

const RegistrationPage = () => {
  return (
    <>
      <Register />
    </>
  );
};

export default RegistrationPage;
