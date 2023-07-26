import { Tabs, Upload, Typography, Button, Input, List } from 'antd';
import React, { useState } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import axios, { AxiosResponse } from 'axios';
import s from './DataSource.module.css';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import globalService from '@/service/globalService';
import crawlService from '@/service/crawlService';
import { CrawledLink } from '@/components/DataSource/crawledLink.type';
import { FileSize } from '@/components/DataSource/DataSourcePropsType';
import { Chatbot } from '@/types/models/globals';
import fileUploadService from '@/service/pineconeService';
import CrawledComponent from '@/components/DataSource/CrawledComponent/CrawledComponent';
import FileDragger from '@/components/DataSource/FileDragger/FileDragger';

type DataSourceProps = {
  chatbot: Chatbot;
};
export const DataSource: React.FC<DataSourceProps> = ({ chatbot }) => {
  const router = useRouter();

  const { Paragraph } = Typography;
  const { TextArea } = Input;

  const [, setActiveTab] = useState<string>('Files');
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  const [isTextAreaVisible, setIsTextAreaVisible] = useState<boolean>(false);
  const [countCharsInFiles, setCountCharsInFiles] = useState<number>(0); //Счетчик символов в файлах
  const [countCharsInText, setCountCharsInText] = useState<number>(0); //Cчетчик символов в текте (Text)

  const [countCharsInWebsite, setCountCharsInWebsite] = useState<number>(0); //Cчетчик символов c сайта
  const [countQna, setCountQna] = useState<number>(0);

  const [qnaList, setQnaList] = useState<
    Array<{ question: string; answer: string }>
  >([]);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newAnswer, setNewAnswer] = useState<string>('');

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewQuestion(e.target.value);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAnswer(e.target.value);
  };

  const handleAddQna = () => {
    if (isTextAreaVisible) {
      setQnaList([...qnaList, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion('');
      setNewAnswer('');
      setIsTextAreaVisible(false);
      setCountQna(qnaList.length + 1);
    } else {
      setIsTextAreaVisible(true);
    }
  };

  const handleRemoveQna = (index: number) => {
    setQnaList(qnaList.filter((_, i) => i !== index));
    setCountQna(qnaList.length - 1);
  };

  const handleTabClick = (key: string) => {
    setActiveTab(key);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
    setCountCharsInText(e.target.value.length);
  };

  const handleRetrain = async () => {
    await fileUploadService.post('/embedding/setup', {
      chatbot_id: chatbot._id,
    });
  };

  const saveText = () => {
    await globalService.post('/file-upload/')
  }

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
          <TextArea
            placeholder="Введите текст"
            rows={15}
            value={textAreaValue}
            onChange={handleTextAreaChange}
          />
          <Button onClick={saveText}>Сохранить текст</Button>
        </>
      ),
    },
    {
      key: 'Website',
      label: 'Website',
      children: (
        <>
          <CrawledComponent chatbot={chatbot} />
        </Button>
      ),
    },
    {
      key: 'Q&A',
      label: 'Q&A',
      children: (
        <>
          <Button onClick={handleAddQna}>Add</Button>
          {isTextAreaVisible && (
            <>
              <TextArea
                placeholder="Question"
                rows={3}
                style={{ marginTop: '5px' }}
                value={newQuestion}
                onChange={handleQuestionChange}
              />
              <TextArea
                placeholder="Answer"
                rows={7}
                style={{ marginTop: '5px' }}
                value={newAnswer}
                onChange={handleAnswerChange}
              />
            </>
          )}
          {qnaList &&
            qnaList.map((qna, index) => (
              <div key={index}>
                <DeleteOutlined
                  type="delete"
                  onClick={() => handleRemoveQna(index)}
                />
                <TextArea rows={2} value={qna.question} disabled />
                <TextArea rows={2} value={qna.answer} disabled />
              </div>
            ))}
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
      <Button
        type="primary"
        style={{ width: '300px', height: '60px', marginTop: '15px' }}
        onClick={handleRetrain}
      >
        Retrain chatbot
      </Button>
    </div>
  );
};
