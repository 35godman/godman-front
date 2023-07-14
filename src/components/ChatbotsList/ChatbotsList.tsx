import React, { useEffect, useState } from 'react';
import s from './ChatbotsList.module.css';
import { Button, Typography } from 'antd';
import { CardBot } from './CardBot';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';

export const ChatbotsList = () => {
  const router = useRouter();
  const { Paragraph, Title } = Typography;
  const [botLimit, setBotLimit] = useState(1);
  const [botsDB, setBotsDB] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.user);
  console.log('🚀 ~ file: ChatbotsList.tsx:16 ~ ChatbotsList ~ user:', user);
  const getBotsByUserId = async () => {
    const response = await axios.get(
      `http://localhost:5050/api/chatbot/find/user/${user._id}`,
    );
    console.log(
      '🚀 ~ file: ChatbotsList.tsx:19 ~ getBotsByUserId ~ response:',
      response,
    );
    setBotsDB(response.data);
  };
  useEffect(() => {
    getBotsByUserId();
  }, []);
  return (
    <div className={s.botsListWrapper}>
      <div>
        <div className={s.botsListHeader}>
          <div>
            <Title level={3}>My Chatbots</Title>
            <Paragraph>Chatbot limit: {user.chatbot_limit}</Paragraph>
          </div>
          <div>
            <Button onClick={() => router.push('/data-source')} type="primary">
              New chatbot
            </Button>
          </div>
        </div>
      </div>
      <div className={s.botListAll}>
        {botsDB.length > 0 &&
          botsDB.map(bot => {
            return <CardBot botID={bot._id} key={bot._id} />;
          })}
      </div>
    </div>
  );
};
