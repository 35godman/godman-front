import React, { FC } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type SendMessageButtonProps = {
  onclick: () => void;
};

const SendMessageButton: FC<SendMessageButtonProps> = ({ onclick }) => {
  return (
    <Button onClick={onclick}>
      <SendOutlined style={{ fontSize: '20px' }} />
    </Button>
  );
};

export default SendMessageButton;
