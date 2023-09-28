import React, { FC, useState } from 'react';
import s from '@/features/Login/ui/LogIn.module.css';
import { Form, Input, message } from 'antd';
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
  const [login, setLogin] = useState('');

  const registerHandler = async (values: RegisterValues) => {
    const response = await registUser(values);
    if (response.status === 201) {
      message.success(`User ${values.email} registered`);
      await router.push('/account/login');
    }
  };

  return (
    <div className={s.lodInWrapper}>
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
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <BtnUniv
            type="primary"
            text="Continue"
            onClick={() =>
              registerHandler({ email: login, password: password })
            }
          />
        </Form>
        <div className={s.bodyWrapper}>
          <p className={s.logInAsk}>
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
