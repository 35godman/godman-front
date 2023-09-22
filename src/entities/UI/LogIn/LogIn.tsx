import React from 'react';
import s from './LogIn.module.css';
import { Input } from 'antd';
import { BtnUniv } from '../Buttons/Buttons';
import Link from 'next/link';

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
        <img
          className={s.imgBorder}
          src={'imgGeneralPage/border_line.png'}
          alt=""
        />
      </div>
      <div className={s.bodyWrapper}>
        <Input className={s.input} placeholder="Enter your business email" />
        <BtnUniv type="primary" text="Continue" />
        <p className={s.logInAsk}>
          Don’t have an account?{' '}
          <Link href={'/'} className={s.spanLink}>
            Sign Up Free
          </Link>
        </p>
      </div>
      <div className={s.continue}>
        <img
          className={s.imgContinue}
          src={'imgGeneralPage/continue_line.png'}
          alt=""
        />
        <p className={s.contText}>or continue with</p>
        <img
          className={s.imgContinue}
          src={'imgGeneralPage/continue_line.png'}
          alt=""
        />
      </div>
      <div className={s.footer}>
        By log in you agree to{' '}
        <Link className={s.linkFooter} href="/">
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link className={s.linkFooter} href="/">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};
