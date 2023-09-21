import React from 'react';
import s from './LogIn.module.css';
import { Input } from 'antd';
import { BtnUniv } from '../Buttons/Buttons';

export const LogIn = () => {
  return (
    <div className={s.lodInWrapper}>
      <div className={s.headerWrapper}>
        <div className={s.logoLogin}>
          <img
            className={s.imgLogoLogin}
            src={'imgGeneralPage/ellipse_pro.png'}
            alt=""
          />
          <p className={s.logoText}>Godman.AI</p>
        </div>
        <p className={s.text}>Log in to Godman.AI to continue</p>
      </div>
      <div>
        <Input className={s.input} placeholder="Enter your business email" />
        <BtnUniv type="primary" text="Continue" />
        <p className={s.logInAsk}>
          Don’t have an account? <span className={s.span}>Sign Up Free</span>
        </p>
      </div>
      <div></div>
    </div>
  );
};
