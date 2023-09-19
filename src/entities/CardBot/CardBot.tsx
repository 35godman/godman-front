import React from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import { resetChars } from '@/app/store/slices/charsCountSlice';
import { useAppDispatch } from '@/app/store/store';
const { Meta } = Card;

type CardBotProps = {
  nameBot: string;
  botID: string;
  onClick: () => Promise<void>;
};
export const CardBot: React.FC<CardBotProps> = ({
  nameBot,
  botID,
  onClick,
}) => {
  return (
    <Card
      className={'border-black border-s-1'}
      hoverable
      style={{ width: 240, margin: '1rem 0' }}
      onClick={onClick}
      data-test={`card-${botID}`}
    >
      <Meta title={nameBot} description={botID} />
    </Card>
  );
};
