import React, { useState } from 'react';
import s from './ChatbotsList.module.css';
import { Button, Typography, Card } from 'antd';
import { CardBot } from './CardBot';

export const ChatbotsList = () => {
  const { Paragraph, Title } = Typography;
  const [botLimit, setBotLimit] = useState(1);
  return (
    <div className={s.botsListWrapper}>
      <div>
        <div className={s.botsListHeader}>
          <Title level={3}>My Chatbots</Title>
          <Paragraph>Chatbot limit: {botLimit}</Paragraph>
        </div>
        <div>
          <Button type="primary">New chatbot</Button>
        </div>
      </div>
      <div>
        <CardBot nameBot="Garl"></CardBot>
        <CardBot photoLink="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"></CardBot>
        <CardBot botID="jwidijJJJ"></CardBot>
      </div>
    </div>
  );
};
