import { Tabs, Upload, Typography, Button, Input, List } from 'antd';
import React, { useState } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import axios, { AxiosResponse } from 'axios';
import s from './DataSource.module.css';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import globalService from '@/service/globalService';
import crawlService from '@/service/crawlService';
import { CrawledLink } from '@/components/DataSource/CrawledComponent/crawledLink.type';
import { FileSize } from '@/components/DataSource/DataSourcePropsType';
import { Chatbot } from '@/types/models/globals';
import fileUploadService from '@/service/pineconeService';
import CrawledComponent from '@/components/DataSource/CrawledComponent/CrawledComponent';
import FileDragger from '@/components/DataSource/FileDragger/FileDragger';
import TextSource from '@/components/DataSource/TextSource/TextSource';
import QAList from '@/components/DataSource/QA/QAList';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import { selectCurrentSize } from '@/features/slices/charsCountSlice';

type DataSourceProps = {
  chatbot: Chatbot;
  setChatbot: (chatbot: Chatbot) => void;
};
export const DataSource: React.FC<DataSourceProps> = ({
  chatbot,
  setChatbot,
}) => {
  const charsInChatbot = useSelector(selectCurrentSize);
  console.log('=>(DataSource.tsx:32) charsInChatbot', charsInChatbot);

  const router = useRouter();
  console.log('=>(TextSource.tsx:51) chatbot', chatbot);
  const { Paragraph } = Typography;

  const [, setActiveTab] = useState<string>('Files');

  const handleTabClick = (key: string) => {
    setActiveTab(key);
  };

  const handleRetrain = async () => {
    await fileUploadService.post('/embedding/setup', {
      chatbot_id: chatbot._id,
    });
  };

  const tabs = [
    {
      key: 'Files',
      label: 'Files',
      children: (
        <>
          <FileDragger chatbot={chatbot} />
        </>
      ),
    },
    {
      key: 'Text',
      label: 'Text',
      children: (
        <>
          <TextSource chatbot={chatbot} setChatbot={setChatbot} />
        </>
      ),
    },
    {
      key: 'Website',
      label: 'Website',
      children: (
        <>
          <CrawledComponent chatbot={chatbot} />
        </>
      ),
    },
    {
      key: 'Q&A',
      label: 'Q&A',
      children: (
        <>
          <QAList chatbot={chatbot} />
        </>
      ),
    },
  ];

  return (
    <div className={s.dataSourceWrapper}>
      <Tabs
        className={s.tab}
        defaultActiveKey="Files"
        onChange={handleTabClick}
        items={tabs}
      />
      {/*<div className={s.createBotArea}>*/}
      {/*  {countFiles > 0 && (*/}
      {/*      <p>*/}
      {/*        {countFiles} File(s) ({countCharsInFiles} chars )*/}
      {/*      </p>*/}
      {/*  )}*/}
      {/*  {countCharsInText > 0 && <p>{countCharsInText} text input chars </p>}*/}
      {/*  {countCharsInWebsite > 0 && (*/}
      {/*      <p>{countCharsInWebsite} Chars from web </p>*/}
      {/*  )}*/}
      {/*  {countQna > 0 && <p>{countQna} Q&A</p>}*/}
      {/*</div>*/}
      <div className={'flex flex-col'}>
        <div className={'flex flex-col'}>
          <Paragraph>Количество символов {charsInChatbot}</Paragraph>
          <Paragraph>Макс. количество {chatbot.settings.char_limit}</Paragraph>
        </div>

        <PrimaryButton text={'Обучить'} onclick={handleRetrain} />
      </div>
    </div>
  );
};
