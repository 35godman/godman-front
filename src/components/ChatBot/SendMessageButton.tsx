import React, { FC } from 'react';
import { SendOutlined } from '@ant-design/icons';
import globalService from '@/service/globalService';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';

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
