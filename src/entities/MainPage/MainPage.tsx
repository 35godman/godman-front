import React from 'react';
import s from './MainPage.module.css';
import MainPageHeader from '@/entities/MainPage/Header/MainPageHeader';
import Input from 'antd/es/input/Input';
import { Button } from 'antd';
import { BtnUniv } from '../UI/Buttons';
const MainPage = () => {
  return (
    <>
      <main className={s.mainPage}>
        <MainPageHeader />
      </main>
      <section className={s.experience}>
        <div className={s.centralWrapper}>
          <h1 className={s.h1}>
            Revolutionizing the Sales Experience with{' '}
            <span className={s.gradientText}>Adaptive AI</span>
          </h1>
          <p className={s.subtitleH1}>
            Godman's adaptive AI technology can transform any business,
            providing personalized, lightning-fast customer interactions that
            will keep you ahead of the gameGodman's adaptive AI technology can
            transform any business, providing personalized, lightning-fast
            customer interactions that will keep you ahead of the game
          </p>
          <Input
            placeholder="Введите текст"
            suffix={<Button type="primary">Кнопка</Button>}
          />
          <BtnUniv
            width={284}
            height={43}
            type={'regular'}
            text={'Sign Up Free'}
          ></BtnUniv>
          <BtnUniv
            width={284}
            height={43}
            type={'primary'}
            text={'Sign Up Free'}
          ></BtnUniv>
        </div>
      </section>
    </>
  );
};

export default MainPage;
