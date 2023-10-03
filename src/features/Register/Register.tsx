import React, { FC, useEffect, useState } from 'react';
import s from '@/features/Login/ui/LogIn.module.css';
import sr from './Register.module.css';
import { Form, Input, message, Typography } from 'antd';
import { BtnUniv } from '@/entities/UI/Buttons/Buttons';
import Link from 'next/link';
import { RegisterValues } from '@/types/types';
import { registUser } from '@/features/Register/api';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

type RegistrationFormProps = {
  onSuccess?: () => void;
};

export const Register: FC<RegistrationFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [login, setLogin] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    if (password && username && verifyPassword && login) {
      setIsVerified(password === verifyPassword);
    }
  }, [password, verifyPassword]);

  const registerHandler = async (values: RegisterValues) => {
    const response = await registUser(values);
    if (response.status === 201) {
      message.success(`User ${values.email} registered`);
      await router.push('/account/login');
    }
  };

  return (
    <div className={`${s.lodInWrapper} ${sr.regWrapper}`}>
      <div className={s.headerWrapper}>
        <div className={s.logoLogin}>
          <img
            className={s.imgLogoLogin}
            src="/imgGeneralPage/ellipse_pro.png"
            alt="Logo"
          />
          <p className={s.logoText}>Godman.AI</p>
        </div>
        <p className={s.text}>Log in to Godman.AI to continue</p>
        <img
          className={s.imgBorder}
          src="/imgGeneralPage/border_line.png"
          alt="Border Line"
        />
      </div>

      <div className={s.bodyWrapper}>
        <Form name="login" labelCol={{ span: 8 }} autoComplete="off">
          <div className={`flex flex-col text-white ${s.mt20px}`}>
            <h3 className={s.text}>Enter Username</h3>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input
                style={{ marginBottom: '0' }}
                value={username}
                className={`${s.input} ${s.mt20px}`}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className={'flex flex-col text-white'}>
            <h3 className={s.text}>Enter Email</h3>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input
                value={login}
                className={`${s.input} ${s.mt20px}`}
                placeholder="Enter your email"
                onChange={(e) => setLogin(e.target.value)}
              />
            </Form.Item>
          </div>

          <div className={'flex flex-col text-white'}>
            <h3 className={s.text}>Enter Password</h3>
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
                className={`${s.input} ${s.mt20px}`}
                style={{ marginBottom: '0' }}
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className={'flex flex-col text-white'}>
            {/*<h3 className={s.text}>Verify Password</h3>*/}
            <Input
              style={{ marginTop: '0' }}
              value={verifyPassword}
              className={`${s.input} ${s.mt20px}`}
              placeholder="Verify Password"
              type="password"
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </div>

          <BtnUniv
            disabled={!isVerified}
            type="primary"
            text="Continue"
            onClick={() =>
              registerHandler({ email: login, password: password, username })
            }
          />
        </Form>
        <div className={s.bodyWrapper}>
          <p className={`${s.logInAsk}  ${sr.regAsk}`}>
            Already have an account?{' '}
            <Link href={'/account/login'} className={s.spanLink}>
              Back To Login
            </Link>
          </p>
        </div>
        <div className={s.continue}>
          <img
            className={s.imgContinue}
            src="/imgGeneralPage/continue_line.png"
            alt="Continue Line"
          />
          {/* <p className={s.contText}>or continue with</p> */}
          <img
            className={s.imgContinue}
            src="/imgGeneralPage/continue_line.png"
            alt="Continue Line"
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
    </div>
  );
};
