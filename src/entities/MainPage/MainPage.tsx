import React from 'react';
import s from './MainPage.module.css';
import MainPageHeader from '@/entities/MainPage/Header/MainPageHeader';
import { BtnUniv } from '../UI/Buttons';
import { InputAskAI } from '../UI/InputAskAI';
import { CardFeatures } from '../UI/CardFeatures';
import { CardCases } from '../UI/CardCases';
import { CardPricing } from '../UI/CardPricing';
import { Header } from '../UI/Header';
import cn from 'classnames';
const MainPage = () => {
  return (
    <div className={s.generalWrapper}>
      <main className={s.mainPage}>
        {/* <MainPageHeader /> */}
        <Header />
      </main>
      <section className={s.experience}>
        <div className={s.centralWrapper}>
          <h1 className={s.h1}>
            Revolutionizing the Sales Experience with{' '}
            <span className={s.gradientText}>Adaptive AI</span>
          </h1>
          <p className={cn(s.subtitleH1, s.godmansText)}>
            Godman's adaptive AI technology can transform any business,
            providing personalized, lightning-fast customer interactions that
            will keep you ahead of the game
          </p>

          {/* <BtnUniv
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
          <InputAskAI />
          <CardFeatures
            heading="Fast Learning"
            text="Our AI chatbot adapts quickly, understanding and selling your products like a seasoned pro."
          />
          <CardCases
            name="-Marina Koltseva"
            text="It's a miracle! I am delighted with his ability to work with documents and analyze information. He saved me so much time and made the workflow more productive, which is just happiness!"
          />
          <CardPricing
            cardName="Basic"
            text="Personal package for individuals & small businesses"
            benefits={[
              'Basic Support',
              '500 Messages',
              'Sales Insights',
              '1 Chatbot',
            ]}
            price={0}
            logo="basic"
          /> */}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
