import { RegisterValues } from '@/types/types';
import { Button, Form, Input, message, Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import { registUser } from '@/features/Register/api';
import { FC } from 'react';
type RegistrationFormProps = {
  onSuccess?: () => void;
};
export const RegistrationForm: FC<RegistrationFormProps> = ({ onSuccess }) => {
  const registerHandler = async (values: RegisterValues) => {
    const response = await registUser(values);
    if (response.status === 201) {
      message.success(`User ${values.username} registered`);
      onSuccess && onSuccess();
    }
  };
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
