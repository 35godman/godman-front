import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Tabs,
  Modal,
  notification,
  Spin,
  message,
} from 'antd';
import { LoginValues, RegisterValues } from '@/types/types';
import s from './Login.module.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { setUser } from '@/features/slices/userSlice';
import { useAppDispatch } from '@/features/store';
import globalService from '@/service/globalService';
import { FormattedMessage } from 'react-intl';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [reloginLoad, setReloginLoad] = useState<boolean>(false);
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const loginHandler = async (values: LoginValues) => {
    const response = await globalService.post('auth/login', values);
    if (response.data) {
      Cookies.set('access_token', response.data.token.access_token);
      dispatch(setUser(response.data.user));
      setLoggedIn(true);
      notification.success({
        message: 'Excellent!',
        description: 'You have successfully logged in',
      });
      await router.push('/chatbot-list');
    }
  };

  const registerHandler = async (values: RegisterValues) => {
    const response = await globalService.post('user/register', values);
    if (response.status === 201) {
      Modal.success({
        title: `User ${values.username} registered`,
      });
    }
  };

  // useEffect(() => {
  //   const successLogged = async () => {
  //     if (isLoggedIn) {
  //       await router.push('/chatbot-list');
  //     }
  //   };
  //   successLogged();
  // }, [isLoggedIn]);

  const renderLoginForm = () => {
    return (
      <div className={'m-auto flex justify-center'}>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          className={'w-[30%}'}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={loginHandler}
          //onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: <FormattedMessage id={'enter_pass'} />,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>
              <FormattedMessage id={'remember_me'} />
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: 'rgb(111, 68, 252)' }}
            >
              <FormattedMessage id={'submit'} />
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const renderRegistrationForm = () => {
    return (
      <div className={'flex justify-center'}>
        <Form
          name="registration"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={registerHandler}
          //onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={'w-[30%]'}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: 'rgb(111, 68, 252)' }}
            >
              <FormattedMessage id={'submit'} />
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const tabs = [
    { key: 'login', label: 'Login', children: renderLoginForm() },
    {
      key: 'register',
      label: 'Registration',
      children: renderRegistrationForm(),
    },
  ];

  return (
    <div className={s.loginWrapper}>
      <Modal open={reloginLoad} closable={false} footer={false}>
        <Spin size={'large'} />
      </Modal>
      <Tabs defaultActiveKey="login" centered items={tabs} />
    </div>
  );
};
