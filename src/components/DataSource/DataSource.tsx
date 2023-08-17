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
import { useIntl } from 'react-intl';

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
  const intl = useIntl();
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
    } else {
      setRetrainLoading(false);
    }
  };

  const tabs = [
    {
      key: 'Files',
      label: intl.formatMessage({ id: 'dataSource.files' }),
      children: (
        <>
          <FileDragger chatbot={chatbot} getChatbot={getChatbot} />
        </>
      ),
    },
    {
      key: 'Text',
      label: intl.formatMessage({ id: 'dataSource.text' }),
      children: (
        <>
          <TextSource chatbot={chatbot} setChatbot={setChatbot} />
        </>
      ),
    },
    {
      key: 'Website',
      label: intl.formatMessage({ id: 'dataSource.website' }),
      children: (
        <>
          <CrawledComponent chatbot={chatbot} getChatbot={getChatbot} />
        </>
      ),
    },
    {
      key: 'Q&A',
      label: intl.formatMessage({ id: 'dataSource.qa' }),
      children: (
        <>
          <QAList chatbot={chatbot} />
        </>
      ),
    },
  ];

  return (
    <div className={'flex flex-col items-center'}>
      <Tabs
        className={s.tab}
        defaultActiveKey="Files"
        onChange={handleTabClick}
        items={tabs}
      />
      <div className={'flex flex-col'}>
        <div className={'flex flex-col'}>
          <Paragraph>
            {intl.formatMessage({ id: 'dataSource.char-amount' })}:{' '}
            {charsInChatbot}
          </Paragraph>
          <Paragraph>
            {intl.formatMessage({ id: 'dataSource.max-char-amount' })}:{' '}
            {chatbot.settings.char_limit}
          </Paragraph>
        </div>

        <PrimaryButton
          text={intl.formatMessage({ id: 'dataSource.train' })}
          onclick={handleRetrain}
          loading={retrainLoading}
        />
      </div>
    </div>
  );
};
