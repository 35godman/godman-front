import React from 'react';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ChatBot } from '../ChatBot/ChatBot';
import { Settings } from '../Settings/Settings';
import { DataSource } from '../DataSource/DataSource';
import s from './GeneralSettingsBot.module.css';

export const GeneralSettingsBot: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const tabs = [
    { key: '1', label: 'Chatbot', children: <ChatBot /> },
    { key: '2', label: 'Settings', children: <Settings /> },
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
