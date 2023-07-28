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
import { RootState, useAppDispatch } from '@/features/store';
import { addChatbot } from '@/features/slices/chatbotSlice';
import { setUser } from '@/features/slices/userSlice';
import DeleteTab from '@/components/GeneralSettingsBot/DeleteTab/DeleteTab';
import { addFile } from '@/features/slices/charsCountSlice';
import { useSelector } from 'react-redux';
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
  const [newDataUpdated, setNewDataUpdated] = useState<boolean>(false);

  //use callback
  const getChatbotSettings = useCallback(async () => {
    if (id) {
      fetchedRef.current = true;
      const response: AxiosResponse<Chatbot> = await globalService.get(
        `/chatbot/find/${id}`,
      );

      setChatbot(response.data);
      //set initial files for charsCountSlice
      const { files, website, QA_list } = response.data.sources;
      for (const file of files) {
        dispatch(addFile({ id: file._id, chars: file.char_length }));
      }
      for (const webFile of website) {
        dispatch(addFile({ id: webFile._id, chars: webFile.char_length }));
      }
      for (const qa of QA_list) {
        dispatch(
          addFile({
            id: qa._id,
            chars: qa.answer.length + qa.question.length,
          }),
        );
      }
    }
  }, [dispatch, id]);

  useEffect(() => {
    getChatbotSettings();
  }, [dispatch, id]);

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
          //FIXME getChatbotSettings add
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
      label: 'Embed on site',
      children: <div>Здесь будет компонент Embed on site</div>,
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
