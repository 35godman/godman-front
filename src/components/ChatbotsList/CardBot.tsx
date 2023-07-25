import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/router';
const { Meta } = Card;

type CardBotProps = {
  nameBot: string;
  botID: string;
};
export const CardBot: React.FC<CardBotProps> = ({ nameBot, botID }) => {
  const router = useRouter();

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      onClick={() => router.push(`/gs-bot?id=${botID}`)}
    >
      <Meta title={nameBot} description={botID} />
    </Card>
  );
};
