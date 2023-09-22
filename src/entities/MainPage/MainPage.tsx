import React from 'react';
import s from './MainPage.module.css';
import { BtnUniv } from '../UI/Buttons/Buttons';
import { HelpToggle } from '../UI/HelpToggle/HelpToggle';
import { InputAskAI } from '../UI/InputAskAI/InputAskAI';
import { CardFeatures } from '../UI/CardFeatures/CardFeatures';
import { CardCases } from '../UI/CardCases/CardCases';
import { CardPricing } from '../UI/CardPricing/CardPricing';
import { Header } from '../UI/Header/Header';
import cn from 'classnames';
import { Input } from 'antd';
import Link from 'next/link';
import { LogIn } from '../UI/LogIn/LogIn';
import MainPageHeader from '@/entities/UI/DesktopHeader/MainPageHeader';
import {
  cardsFutures,
  cardsCases,
  cardsPricing,
  helpToggleData,
} from './mainPageData';
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
            Godmans adaptive AI technology can transform any business, providing
            personalized, lightning-fast customer interactions that will keep
            you ahead of the game
          </p>
          <InputAskAI />
          <div className={s.benefitsWrapper}>
            <div className={s.benefit}>
              <p className={s.benifitText}>unclaiming the human factor</p>
              <h3 className={s.benifitSubtitle}>300% sales growth</h3>
            </div>
            <div className={s.benefit}>
              <p className={s.benifitText}>Quick Integration</p>
              <h3 className={s.benifitSubtitle}>in minutes</h3>
            </div>
            <div className={s.benefit}>
              <p className={s.benifitText}>customer satisfaction rate</p>
              <h3 className={s.benifitSubtitle}>95% happy users</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Feautures */}
      <section className={cn(s.section, s.futures)}>
        <h2 className={s.h2}>
          Rise with AI-
          <br />
          powered Sales
        </h2>
        <p className={cn(s.subtitleH1, s.textAfter)}>
          Welcome to the world of Godman.AI — the powerful chatbot constructor
          for businesses that wants to make learning and selling customer
          products a breeze. Unleash the power of AI to take your business to
          new heights!
        </p>
        <div className={s.futuresCards}>
          {cardsFutures.map(item => {
            return (
              <CardFeatures
                text={item.text}
                key={item.heading}
                heading={item.heading}
              />
            );
          })}
        </div>
      </section>

      {/* Cases */}
      <section className={s.section}>
        <h2 className={s.h2}>Loved by Our Users</h2>
        <p className={cn(s.subtitleH1, s.textAfter)}>
          Godman’s AI chatbot is built to grow and adapt as your business
          evolves, constantly improving sales tactics, and enhancing customer
          relationships!
        </p>
        <div className={s.casesCards}>
          {cardsCases.map(item => {
            return (
              <CardCases key={item.name} name={item.name} text={item.text} />
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className={s.section}>
        <h2 className={s.h2}>Discover Our Pricing Plans</h2>
        <div className={s.pricingCards}>
          {cardsPricing.map(item => {
            return (
              <CardPricing
                key={item.cardName}
                cardName={item.cardName}
                text={item.text}
                benefits={item.benefits}
                price={item.price}
                logo={item.logo}
              />
            );
          })}
        </div>
      </section>

      {/* Help */}
      <section className={cn(s.section, s.help)}>
        <h2 className={s.h2}>Frequently Asked Questions</h2>
        {helpToggleData.map(item => {
          return (
            <HelpToggle
              text={item.text}
              heading={item.heading}
              key={item.heading}
            />
          );
        })}
        <HelpToggle
          text="Godman offers unparalleled AI chatbot functionality, top-notch customer engagement, and an ever-evolving platform built for modern businesses."
          heading="Why choose Godman?"
        />
      </section>

      {/* sta */}
      <section className={`${s.section} ${s.staSection}`}>
        <div className={s.staWrapper}>
          <h2 className={s.h2}>
            Supercharge your sales team and Build your first ChatGPT widget
            today!
          </h2>
          <Input
            className={s.inputSign}
            placeholder="Enter your business email"
          />
          <BtnUniv type="regular" text={'Sign up free'} />
        </div>
      </section>
      <section className={s.section}>
        <div className={s.footerWrapper}>
          <div className={s.logo}>
            <img
              className={s.imgFooter}
              src={'imgGeneralPage/ellipse_pro.png'}
              alt=""
            />
            <p className={s.logoText}>Godman.AI</p>
          </div>
          <div className={s.discoverNav}>
            <p className={s.footerSubtitle}>Discover</p>
            <Link className={s.footerlink} href={'/'}>
              Home
            </Link>
            <Link className={s.footerlink} href={'/'}>
              Features
            </Link>
            <Link className={s.footerlink} href={'/'}>
              Cases
            </Link>
            <Link className={s.footerlink} href={'/'}>
              Pricing
            </Link>
            <Link className={s.footerlink} href={'/'}>
              Help
            </Link>
          </div>
          <div className={s.legalNav}>
            <p className={s.footerSubtitle}>Legal</p>
            <Link className={s.footerlink} href={'/'}>
              Privacy Policy
            </Link>
            <Link className={s.footerlink} href={'/'}>
              Terms & Conditions
            </Link>
            <Link className={s.footerlink} href={'/'}>
              Contact us
            </Link>
          </div>
          <div className={s.log}>
            <Link className={s.footerLoglink} href={'/'}>
              Sign Up Free
            </Link>
            <Link className={s.footerLoglink} href={'/'}>
              Log in
            </Link>
            <Link className={s.footerLoglink} href={'/'}>
              Get Basic
            </Link>
            <Link className={s.footerLoglink} href={'/'}>
              Get Pro
            </Link>
            <Link className={s.footerLoglink} href={'/'}>
              Get Enterprise
            </Link>
          </div>
          <div className={s.corp}>
            © 2023 Godman.
            <br />
            AI All rights reserved
          </div>
        </div>
      </section>
      <LogIn />
    </div>
  );
};

export default MainPage;
