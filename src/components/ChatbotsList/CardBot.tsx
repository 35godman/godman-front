import React from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import { resetChars } from '@/features/slices/charsCountSlice';
import { useAppDispatch } from '@/features/store';
const { Meta } = Card;

type CardBotProps = {
  nameBot: string;
  botID: string;
};
export const CardBot: React.FC<CardBotProps> = ({ nameBot, botID }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const changeChatbot = async () => {
    dispatch(resetChars());
    await router.push(`/gs-bot?chatbot_id=${botID}`);
  };

  return (
    <Card hoverable style={{ width: 240 }} onClick={changeChatbot}>
      <Meta title={nameBot} description={botID} />
    </Card>
  );
};
