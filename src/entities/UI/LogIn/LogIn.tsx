import React from 'react';
import s from './LogIn.module.css';
import { Input } from 'antd';
import { BtnUniv } from '../Buttons/Buttons';

export const LogIn = () => {
  return (
    <div className={s.lodInWrapper}>
      <div>
        <div className={s.logo}></div>
        <p className={s.logoText}>Log in to Godman.AI to continue</p>
      </div>
      <div>
        <Input className={s.input} />
        <BtnUniv type="primary" text="Continue" />
        <p className={s.logInAsk}>
          Don’t have an account? <span className={s.span}>Sign Up Free</span>
        </p>
      </div>
      <div></div>
    </div>
  );
};
