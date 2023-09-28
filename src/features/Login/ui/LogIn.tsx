import React, { useState } from 'react';
import s from './LogIn.module.css';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import Link from 'next/link';
import { LoginValues } from '@/types/types';
import { loginUser } from '@/features/Login/api';
import Cookies from 'js-cookie';
import { setUser } from '@/app/store/slices/userSlice';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/app/store/store';
import { FormattedMessage } from 'react-intl';
import { BtnUniv } from '@/entities/UI/Buttons/Buttons';

export const LogIn = () => {
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loginHandler = async (values: LoginValues) => {
    const response = await loginUser(values);
    if (response.data) {
      Cookies.set('access_token', response.data.token.access_token);
      dispatch(setUser(response.data.user));
      notification.success({
        message: 'Excellent!',
        description: 'You have successfully logged in',
      });
      await router.push('/chatbot-list');
    }
  };
  return (
    <div className={s.lodInWrapper}>
      <div className={s.headerWrapper}>
        <div className={s.logoLogin}>
          <img
            className={s.imgLogoLogin}
            src={'/imgGeneralPage/ellipse_pro.png'}
            alt=""
          />
          <p className={s.logoText}>Godman.AI</p>
        </div>
        <p className={s.text}>Log in to Godman.AI to continue</p>
        <img
          className={s.imgBorder}
          src={'/imgGeneralPage/border_line.png'}
          alt=""
        />
      </div>
      <div className={'m-auto flex justify-center'}>
        <Form name="login" labelCol={{ span: 8 }} autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              value={login}
              className={s.input}
              placeholder="Enter your email"
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: <FormattedMessage id={'enter_pass'} />,
              },
            ]}
          >
            <Input
              value={password}
              className={s.input}
              placeholder="Enter your password"
              type={'password'}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <BtnUniv
            type="primary"
            text="Continue"
            onClick={() => loginHandler({ email: login, password: password })}
          />
        </Form>
      </div>
      <div className={s.bodyWrapper}>
        <p className={s.logInAsk}>
          Don’t have an account?{' '}
          <Link href={'/account/register'} className={s.spanLink}>
            Sign Up Free
          </Link>
        </p>
      </div>
      <div className={s.continue}>
        <img
          className={s.imgContinue}
          src={'/imgGeneralPage/continue_line.png'}
          alt=""
        />
        <img
          className={s.imgContinue}
          src={'/imgGeneralPage/continue_line.png'}
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
