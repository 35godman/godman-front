import React, { FC, useCallback, useEffect, useState } from 'react';
import s from './ChatbotsList.module.css';
import { Button, Typography } from 'antd';
import { CardBot } from './CardBot';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import axios, { AxiosResponse } from 'axios';
import globalService from '@/service/globalService';
import { Chatbot, User } from '@/types/models/globals';

type ChatbotsListProps = {
  user_data: User;
};

export const ChatbotsList: FC<ChatbotsListProps> = ({ user_data }) => {
  const router = useRouter();
  const { Paragraph, Title } = Typography;
  const [botsDB, setBotsDB] = useState<Chatbot[]>([]);
  const getBotsByUserId = useCallback(async () => {
    const response = await globalService.get(
      `/chatbot/find/user/${user_data._id}`,
    );
    setBotsDB(response.data);
  }, [user_data]);

  useEffect(() => {
    if (user_data._id) {
      getBotsByUserId();
    }
  }, [getBotsByUserId, user_data]);

  const createChatbot = async () => {
    const response: AxiosResponse<Chatbot> = await globalService.post(
      '/chatbot/create-default',
      {
        user_id: user_data._id,
      },
    );
    await router.push(`/gs-bot?id=${response.data._id}`);
  };
  return (
    <div className={s.botsListWrapper}>
      <div>
        <div className={s.botsListHeader}>
          <div>
            <Title level={3}>My Chatbots</Title>
          </div>
          <div>
            <Button onClick={createChatbot} type="primary">
              New chatbot
            </Button>
          </div>
        </div>
      </div>
      <div className={s.botListAll}>
        {botsDB.length > 0 &&
          botsDB.map((bot) => {
            return (
              <CardBot
                botID={bot._id}
                key={bot._id}
                nameBot={bot.settings.display_name}
              />
            );
          })}
      </div>
    </div>
  );
};
