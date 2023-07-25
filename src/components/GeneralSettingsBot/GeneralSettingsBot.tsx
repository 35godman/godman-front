import React, { FC, useCallback, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ChatBot } from '../ChatBot/ChatBot';
import { Settings } from '../Settings/Settings';
import { DataSource } from '../DataSource/DataSource';
import s from './GeneralSettingsBot.module.css';
import axios, { AxiosResponse } from 'axios';
import globalService from '@/service/globalService';
import { Chatbot, User } from '@/types/models/globals';

type GeneralSettingsBotProps = {
  user_data: User;
};

export const GeneralSettingsBot: FC<GeneralSettingsBotProps> = ({
  user_data,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  /**
   * @COMMENT
   * here's we create a new state to check if the new_domains, new_suggested_messages, new_initial_messages are uploaded
   */
  const [newDataUpdated, setNewDataUpdated] = useState<boolean>(false);
  const getChatbotSettings = useCallback(async () => {
    const response: AxiosResponse<Chatbot> = await globalService.get(
      `/chatbot/find/${id}`,
    );
    setChatbot(response.data);
  }, [id]);
  useEffect(() => {
    getChatbotSettings();
  }, [getChatbotSettings]);

  /**
   * @COMMENT
   * as we use string[] in model and just string here, we joint and update the new_values.
   */
  useEffect(() => {
    if (chatbot && !newDataUpdated) {
      const customChatbot = { ...chatbot };
      customChatbot.settings.new_domains =
        customChatbot.settings.domains.join('\n');
      customChatbot.settings.new_suggested_messages =
        customChatbot.settings.suggested_messages.join('\n');
      customChatbot.settings.new_initial_messages =
        customChatbot.settings.initial_messages.join('\n');
      setNewDataUpdated(true);
    }
  }, [chatbot, newDataUpdated]);

  const tabs = [
    { key: '1', label: 'Chatbot', children: <ChatBot /> },
    {
      key: '2',
      label: 'Settings',
      children: (
        <Settings chatbot={chatbot as Chatbot} setChatbot={setChatbot} />
      ),
    },
    // { key: '3', label: 'Sources', children: <DataSource /> },
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
      children: <div>Здесь будет компонент Delete Bot</div>,
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
