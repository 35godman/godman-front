import { Tabs, Typography } from 'antd';
import React, { useState } from 'react';
import s from './DataSource.module.css';
import { Chatbot } from '@/types/models/globals';
import fileUploadService from '@/service/pineconeService';
import CrawledComponent from '@/components/DataSource/CrawledComponent/CrawledComponent';
import FileDragger from '@/components/DataSource/FileDragger/FileDragger';
import TextSource from '@/components/DataSource/TextSource/TextSource';
import QAList from '@/components/DataSource/QA/QAList';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useSelector } from 'react-redux';
import { selectCurrentSize } from '@/features/slices/charsCountSlice';

type DataSourceProps = {
  chatbot: Chatbot;
  setChatbot: (chatbot: Chatbot) => void;
  getChatbot: () => Promise<Chatbot | undefined>;
};
export const DataSource: React.FC<DataSourceProps> = ({
  chatbot,
  setChatbot,
  getChatbot,
}) => {
  const charsInChatbot = useSelector(selectCurrentSize);
  const { Paragraph } = Typography;
  const [retrainLoading, setRetrainLoading] = useState<boolean>(false);

  const [, setActiveTab] = useState<string>('Files');

  const handleTabClick = (key: string) => {
    setActiveTab(key);
  };

  const handleRetrain = async () => {
    setRetrainLoading(true);
    const response = await fileUploadService.post(
      `/embedding/setup?chatbot_id=${chatbot._id}`,
      {},
    );

    if (response.status === 201) {
      await getChatbot();
      setRetrainLoading(false);
    }
  };

  const tabs = [
    {
      key: 'Files',
      label: 'Files',
      children: (
        <>
          <FileDragger chatbot={chatbot} getChatbot={getChatbot} />
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
          <CrawledComponent chatbot={chatbot} getChatbot={getChatbot} />
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
      <div className={'flex flex-col'}>
        <div className={'flex flex-col'}>
          <Paragraph>Количество символов {charsInChatbot}</Paragraph>
          <Paragraph>Макс. количество {chatbot.settings.char_limit}</Paragraph>
        </div>

        <PrimaryButton
          text={'Обучить'}
          onclick={handleRetrain}
          loading={retrainLoading}
        />
      </div>
    </div>
  );
};
