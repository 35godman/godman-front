import React, { FC, useCallback, useEffect, useState } from 'react';
import s from './ChatbotsList.module.css';
import { Typography } from 'antd';
import { CardBot } from './CardBot';
import { useRouter } from 'next/router';
import { RootState, useAppDispatch } from '@/features/store';
import { AxiosResponse } from 'axios';
import globalService from '@/service/globalService';
import { Chatbot, User } from '@/types/models/globals';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { resetChars } from '@/features/slices/charsCountSlice';
import { useSelector } from 'react-redux';

type ChatbotsListProps = {
  user_data: User;
};

export const ChatbotsList: FC<ChatbotsListProps> = ({ user_data }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { Title } = Typography;
  const [botsDB, setBotsDB] = useState<Chatbot[]>([]);
  const getBotsByUserId = useCallback(async () => {
    const response = await globalService.get(`/chatbot/find/user/${user._id}`);
    setBotsDB(response.data);
  }, [user]);

  useEffect(() => {
    if (user._id) {
      getBotsByUserId();
    }
  }, [user]);

  const createChatbot = async () => {
    const response: AxiosResponse<Chatbot> = await globalService.post(
      '/chatbot/create-default',
      {
        user_id: user_data._id,
      },
    );
    dispatch(resetChars());
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
            <PrimaryButton onclick={createChatbot}>
              Создать чатбот
            </PrimaryButton>
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
