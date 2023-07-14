import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ChatBot } from '../ChatBot/ChatBot';
import { Settings } from '../Settings/Settings';
import { DataSource } from '../DataSource/DataSource';
import s from './GeneralSettingsBot.module.css';
import axios from 'axios';

export const GeneralSettingsBot: React.FC = () => {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const [settingsDB, setSettingsDB] = useState<any>({});
  const getBotsByUserId = async () => {
    const response = await axios.get(
      `http://localhost:5050/api/chatbot/find/${id}`,
    );
    setSettingsDB(response.data.settings);
  };
  useEffect(() => {
    getBotsByUserId();
  }, []);

  const tabs = [
    { key: '1', label: 'Chatbot', children: <ChatBot /> },
    {
      key: '2',
      label: 'Settings',
      children: (
        <Settings
          chatbotIdP={id}
          nameP={settingsDB.display_name}
          basePromptP={settingsDB.base_prompt}
        />
      ),
    },
    { key: '3', label: 'Sources', children: <DataSource /> },
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
    <Tabs
      defaultActiveKey="1"
      centered
      className={s.fullWidthTabs}
      items={tabs}
    />
  );
};
