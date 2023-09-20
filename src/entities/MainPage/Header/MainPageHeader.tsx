import React from 'react';
import LoginButton from '@/entities/MainPage/Header/LoginButton/LoginButton';
import RegisterButton from '@/entities/MainPage/Header/RegisterButton/RegisterButton';
import { Nav } from '@/entities/MainPage/Header/Nav/Nav';
import Logo from '../../../../public/svg/1440/logo.svg';
const MainPageHeader = () => {
  return (
    <div className={'flex items-center w-full justify-between'}>
      <Logo />
      <Nav />
      <LoginButton />
      <RegisterButton />
    </div>
  );
};

export default MainPageHeader;
