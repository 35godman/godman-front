import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Tabs, Modal, notification } from 'antd';
import { LoginValues, RegisterValues } from '@/types/types';
import s from './Login.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setUser } from '@/redux/slices/userSlice';
import { useAppDispatch } from '../../redux/store';
import { AxiosError } from '@/types/types';

const { TabPane } = Tabs;

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const [isLoggedIn, setLoggedin] = useState<boolean>(false);

  const loginHandler = async (values: LoginValues) => {
    try {
      const response = await axios.post(
        'http://localhost:5050/api/auth/login',
        values,
      );
      if (response.status === 201) {
        Cookies.set('access_token', response.data.token.access_token);
        dispatch(setUser(response.data.user));
        setLoggedin(true);
        notification.success({
          message: 'Excellent!',
          description: 'You have successfully logged in',
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const registerHandler = async (values: RegisterValues) => {
    try {
      const response = await axios.post(
        'http://localhost:5050/api/user/register',
        values,
      );
      if (response.status === 201) {
        Modal.success({
          title: `User ${values.username} registered`,
        });
      }
    } catch (e) {
      const err = e as AxiosError;
      console.log(err);
      Modal.error({
        title: err.response.data.message,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/general-navigation');
    }
  }, [isLoggedIn]);

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
          onFinishFailed={onFinishFailed}
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
                message: 'Please input your password!',
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
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
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
          onFinishFailed={onFinishFailed}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return (
    <div className={s.loginWrapper}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Login" key="1">
          {renderLoginForm()}
        </TabPane>
        <TabPane tab="Registration" key="2">
          {renderRegistrationForm()}
        </TabPane>
      </Tabs>
    </div>
  );
};
