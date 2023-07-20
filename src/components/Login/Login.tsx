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
} from 'antd';
import { LoginValues, RegisterValues } from '@/types/types';
import s from './Login.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setUser } from '@/redux/slices/userSlice';
import { useAppDispatch } from '@/redux/store';
import globalService from '@/service/globalService';
import { FormattedMessage, useIntl } from 'react-intl';

const { TabPane } = Tabs;

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [reloginLoad, setReloginLoad] = useState<boolean>(false);
  const router = useRouter();
  const [isLoggedIn, setLoggedin] = useState<boolean>(false);

  const loginHandler = async (values: LoginValues) => {
    const response = await globalService.post('auth/login', values);
    if (response.status === 201) {
      Cookies.set('access_token', response.data.token.access_token);
      dispatch(setUser(response.data.user));
      setLoggedin(true);
      notification.success({
        message: 'Excellent!',
        description: 'You have successfully logged in',
      });
    }
  };

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      const relogin = async () => {
        setReloginLoad(true);
        try {
          await globalService.get('auth/relogin');
          await router.push('/chatbot-list');
        } catch (e) {
          console.error(e);
        }
        setReloginLoad(false);
      };
      relogin();
      initialRender.current = false;
    }
  }, [router]);

  const registerHandler = async (values: RegisterValues) => {
    const response = await globalService.post('user/register', values);
    if (response.status === 201) {
      Modal.success({
        title: `User ${values.username} registered`,
      });
    }
  };

  const onFinishFailed = (errorInfo: never) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/general-navigation');
    }
  }, [isLoggedIn, router]);

  const renderLoginForm = () => {
    return (
      <div className={s.loginForm}>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
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
            <Button type="primary" htmlType="submit">
              <FormattedMessage id={'submit'} />
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const renderRegistrationForm = () => {
    return (
      <div className={s.loginForm}>
        <Form
          name="registration"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={registerHandler}
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
            <Button type="primary" htmlType="submit">
              <FormattedMessage id={'submit'} />
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const tabs = [
    { key: '1', label: 'Login', children: renderLoginForm() },
    {
      key: '6',
      label: 'Registration',
      children: renderRegistrationForm(),
    },
  ];

  return (
    <div className={s.loginWrapper}>
      <Modal open={reloginLoad} closable={false} footer={false}>
        <Spin size={'large'} />
      </Modal>
      <Tabs defaultActiveKey="1" centered items={tabs} />
    </div>
  );
};
