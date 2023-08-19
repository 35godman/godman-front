import React from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import { resetChars } from '@/features/store/slices/charsCountSlice';
import { useAppDispatch } from '@/features/store/store';
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
      hoverable
      style={{ width: 240 }}
      onClick={onClick}
      data-test={`card-${botID}`}
    >
      <Meta title={nameBot} description={botID} />
    </Card>
  );
};
