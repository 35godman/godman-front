import React, { useState } from 'react';
import s from './ChatbotsList.module.css';
import { Button, Typography } from 'antd';
import { CardBot } from './CardBot';
import { useRouter } from 'next/router';

export const ChatbotsList = () => {
  const router = useRouter();
  const { Paragraph, Title } = Typography;
  const [botLimit, setBotLimit] = useState(1);

  return (
    <div className={s.botsListWrapper}>
      <div>
        <div className={s.botsListHeader}>
          <div>
            <Title level={3}>My Chatbots</Title>
            <Paragraph>Chatbot limit: {botLimit}</Paragraph>
          </div>
          <div>
            <Button onClick={() => router.push('/data-source')} type="primary">
              New chatbot
            </Button>
          </div>
        </div>
      </div>
      <div className={s.botListAll}>
        <CardBot nameBot="Garl"></CardBot>
        <CardBot photoLink="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"></CardBot>
        <CardBot botID="jwidijJJJ"></CardBot>
      </div>
    </div>
  );
};
