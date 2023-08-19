import React from 'react';
import { Button, Checkbox, Form, Input, Tabs, Modal, notification } from 'antd';
import { LoginValues, RegisterValues } from '@/types/types';
import s from './Login.module.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { setUser } from '@/features/store/slices/userSlice';
import { useAppDispatch } from '@/features/store/store';
import globalService from '@/shared/service/globalService';
import { FormattedMessage } from 'react-intl';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loginHandler = async (values: LoginValues) => {
    const response = await globalService.post('auth/login', values);
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
