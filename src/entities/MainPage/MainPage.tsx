import React from 'react';
import s from './MainPage.module.css';
import MainPageHeader from '@/entities/MainPage/Header/MainPageHeader';
const MainPage = () => {
  return (
    <>
      <main className={s.mainPage}>
        <MainPageHeader />
      </main>
    </>
  );
};

export default MainPage;
