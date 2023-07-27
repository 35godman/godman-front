import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ChatBot } from '../ChatBot/ChatBot';
import { Settings } from '../Settings/Settings';
import { DataSource } from '../DataSource/DataSource';
import s from './GeneralSettingsBot.module.css';
import axios, { AxiosResponse } from 'axios';
import globalService from '@/service/globalService';
import { Chatbot, User } from '@/types/models/globals';
import { useAppDispatch } from '@/features/store';
import { addChatbot } from '@/features/slices/chatbotSlice';
import { setUser } from '@/features/slices/userSlice';
import DeleteTab from '@/components/GeneralSettingsBot/DeleteTab/DeleteTab';
type GeneralSettingsBotProps = {
  user_data: User;
};

export const GeneralSettingsBot: FC<GeneralSettingsBotProps> = ({
  user_data,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const fetchedRef = useRef(false);
  /**
   * @COMMENT
   * here's we create a new state to check if the new_domains, new_suggested_messages, new_initial_messages are uploaded
   */
  const [newDataUpdated, setNewDataUpdated] = useState<boolean>(false);
  useEffect(() => {
    const getChatbotSettings = async () => {
      if (id && !fetchedRef.current) {
        fetchedRef.current = true;
        const response: AxiosResponse<Chatbot> = await globalService.get(
          `/chatbot/find/${id}`,
        );

        setChatbot(response.data);
      }
    };
    getChatbotSettings();
  }, [dispatch, id, fetchedRef]);

  useEffect(() => {
    dispatch(setUser(user_data));
  }, [dispatch, user_data]);

  const tabs = [
    {
      key: '1',
      label: 'Chatbot',
      children: <ChatBot chatbot={chatbot as Chatbot} />,
    },
    {
      key: '2',
      label: 'Settings',
      children: (
        <Settings
          chatbot={chatbot as Chatbot}
          setChatbot={setChatbot}
          setNewDataUpdated={setNewDataUpdated}
          newDataUpdated={newDataUpdated}
        />
      ),
    },
    {
      key: '3',
      label: 'Sources',
      children: (
        <DataSource chatbot={chatbot as Chatbot} setChatbot={setChatbot} />
      ),
    },
    {
      key: '4',
      label: 'Embled on site',
      children: <div>Здесь будет компонент Embled on site</div>,
    },
    {
      key: '5',
      label: 'Share',
      children: <div>Здесь будет компонент Share</div>,
    },
    {
      key: '6',
      label: 'Delete Bot',
      children: (
        <>
          <DeleteTab chatbot={chatbot as Chatbot} />
        </>
      ),
    },
  ];
  return (
    <>
      {chatbot && (
        <Tabs
          defaultActiveKey="1"
          centered
          className={s.fullWidthTabs}
          items={tabs}
        />
      )}
    </>
  );
};
