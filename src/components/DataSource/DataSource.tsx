import { Tabs, Upload, Typography, Button, Input } from 'antd';
import React, { useState } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import axios from 'axios';
import s from './DataSource.module.css';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import globalService from '@/service/globalService';

export const DataSource: React.FC = () => {
  const router = useRouter();
  const { Dragger } = Upload;
  const { Paragraph } = Typography;
  const { TextArea } = Input;
  const [, setActiveTab] = useState<string>('Files');
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const [chatbotName, setChatbotName] = useState<string>('');
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [parsedContent, setParsedContent] = useState<string>('');
  const [isTextAreaVisible, setIsTextAreaVisible] = useState<boolean>(false);
  const [countFiles, setCountFiles] = useState<number>(0); //Cчетчик файлов
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

  const handleWebsiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
  };

  const handleWebsiteParse = async () => {
    try {
      const res = await axios.post('/api/parse', {
        url: websiteUrl,
      });
      if (res.data && res.data.parsedContent) {
        setParsedContent(res.data.parsedContent);
        setCountCharsInWebsite(res.data.parsedContent.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = (info: UploadChangeParam<UploadFile<any>>) => {
    setFiles(info.fileList);
    setCountFiles(info.fileList.length);
  };

  const handleCustomUpload = async () => {
    const data = new FormData();

    // Append all files to the FormData instance
    files.forEach(file => {
      if (file.originFileObj) {
        data.append(`files`, file.originFileObj);
      }
    });
    /**
     * @ROMAN тут надо в глобал редакс стейт записывать нынешний id chatbot
     */
    data.append('chatbot_id', '64ad3d201ff3cf1fb154fd54');

    await globalService.post('/file-upload/upload', data);

    console.log('Upload Files', files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatbotName(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
    setCountCharsInText(e.target.value.length);
  };

  const tabs = [
    {
      key: 'Files',
      label: 'Files',
      children: (
        <>
          <Dragger
            name="file"
            multiple
            onChange={handleUpload}
            style={{ marginBottom: '16px' }}
          >
            <p>Upload files</p>
          </Dragger>
          <Button onClick={handleCustomUpload} disabled={!files.length}>
            Upload
          </Button>
          <Paragraph type="warning" style={{ marginTop: '15px' }}>
            NOTE: Uploading a PDF using safari doesn&apos;t work, we&apos;re
            looking into the issue. Make sure the text is OCR&apos;d, i.e. you
            can copy it.
          </Paragraph>
        </>
      ),
    },
    {
      key: 'Text',
      label: 'Text',
      children: (
        <>
          <Input
            placeholder="chatbot name"
            style={{ marginBottom: '16px' }}
            value={chatbotName}
            onChange={handleInputChange}
          />
          <TextArea
            placeholder="Введите текст"
            rows={15}
            value={textAreaValue}
            onChange={handleTextAreaChange}
          />
        </>
      ),
    },
    {
      key: 'Website',
      label: 'Website',
      children: (
        <>
          <div className={s.webInputWrap}>
            <Input
              placeholder="Enter website URL"
              style={{
                marginBottom: '16px',
                marginRight: '16px',
              }}
              value={websiteUrl}
              onChange={handleWebsiteUrlChange}
            />
            <Button type="primary" onClick={handleWebsiteParse}>
              Parse website
            </Button>
          </div>

          <TextArea
            style={{ marginTop: '5px' }}
            placeholder="Parsed website content will appear here"
            rows={15}
            value={parsedContent}
            disabled
          />
        </>
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
        style={{
          width: '700px',
          height: '600px',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          padding: '15px',
          marginTop: '30px',
        }}
        defaultActiveKey="Files"
        onChange={handleTabClick}
        items={tabs}
      />
      <div className={s.createBotArea}>
        {countFiles > 0 && (
          <p>
            {countFiles} File(s) ({countCharsInFiles} chars )
          </p>
        )}
        {countCharsInText > 0 && <p>{countCharsInText} text input chars </p>}
        {countCharsInWebsite > 0 && (
          <p>{countCharsInWebsite} Chars from web </p>
        )}
        {countQna > 0 && <p>{countQna} Q&A</p>}
      </div>
      <Button
        type="primary"
        style={{ width: '300px', height: '60px', marginTop: '15px' }}
        onClick={() => router.push('/settings')}
      >
        CREATE CHAT BOT
      </Button>
    </div>
  );
};
