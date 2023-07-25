import { Tabs, Upload, Typography, Button, Input, List } from 'antd';
import React, { useState } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import axios, { AxiosResponse } from 'axios';
import s from './DataSource.module.css';
import { DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import globalService from '@/service/globalService';
import { DataSourcePropsType, FileSize } from './DataSourcePropsType';
import crawlService from '@/service/crawlService';
import { CrawledLink } from '@/components/DataSource/crawledLink.type';

export const DataSource: React.FC<DataSourcePropsType> = ({ user }) => {
  const router = useRouter();

  const { Dragger } = Upload;
  const { Paragraph } = Typography;
  const { TextArea } = Input;

  const [, setActiveTab] = useState<string>('Files');
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const [chatbotName, setChatbotName] = useState<string>('');
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [parsedContent, setParsedContent] = useState<CrawledLink[]>([]);
  const [isTextAreaVisible, setIsTextAreaVisible] = useState<boolean>(false);
  const [countFiles, setCountFiles] = useState<number>(0); //Cчетчик файлов
  const [countCharsInFiles, setCountCharsInFiles] = useState<number>(0); //Счетчик символов в файлах
  const [countCharsInText, setCountCharsInText] = useState<number>(0); //Cчетчик символов в текте (Text)

  const [countCharsInWebsite, setCountCharsInWebsite] = useState<number>(0); //Cчетчик символов c сайта
  const [countQna, setCountQna] = useState<number>(0);

  const [fileInfo, setFileInfo] = useState<FileSize[]>([]);

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
      const res: AxiosResponse<CrawledLink[]> = await crawlService.post(
        '/crawler/crawl',
        {
          weblink: websiteUrl,
          chatbot_id: '64ad3c264cea6f6d06ce84fd',
        },
      );
      setParsedContent(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpload = async (info: UploadChangeParam<UploadFile<unknown>>) => {
    const { file, fileList } = info;
    setFiles(fileList);
    setCountFiles(fileList.length);
    const data = new FormData();
    if (file.status === 'removed') {
      const filteredFileInfo = fileInfo.filter(
        (item) => item.name !== file.name,
      );
      setFileInfo([...filteredFileInfo]);
    }
    if (file.status === 'done') {
      files.forEach((file) => {
        if (file.originFileObj) {
          data.append(
            `files`,
            file.originFileObj,
            encodeURIComponent(file.name),
          );
        }
      });

      const response: AxiosResponse<FileSize[]> = await globalService.post(
        '/file-upload/get-char-length',
        data,
      );
      setFileInfo(response.data);
    }
  };

  const handleCustomUpload = async () => {
    const data = new FormData();

    // Append all files to the FormData instance
    files.forEach((file) => {
      if (file.originFileObj) {
        data.append(`files`, file.originFileObj);
      }
    });
    data.append('chatbot_id', '64ad3d201ff3cf1fb154fd54');

    const response: AxiosResponse<FileSize[]> = await globalService.post(
      '/file-upload/multi-upload',
      data,
    );
    setFileInfo(response.data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatbotName(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
    setCountCharsInText(e.target.value.length);
  };

  const deleteCrawledLink = (link: CrawledLink) => {
    const removedParsedContent = [...parsedContent];
    setParsedContent(
      removedParsedContent.filter((item) => item.url !== link.url),
    );
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
            accept={'.docx,.txt,.pdf'}
          >
            <p>Upload files</p>
          </Dragger>
          <Button onClick={handleCustomUpload} disabled={!files.length}>
            Upload
          </Button>
          <List
            dataSource={fileInfo}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>{item.name}</Typography.Text>
                {item.textSize}
              </List.Item>
            )}
          ></List>
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
          <List
            dataSource={parsedContent}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark className={s.crawledLinkHeading}>
                  {item.url}
                </Typography.Text>
                {item.size}
                <Button onClick={() => deleteCrawledLink(item)}>
                  <DeleteOutlined />
                </Button>
              </List.Item>
            )}
          ></List>
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
        className={s.tab}
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
        onClick={() => router.push('/')}
      >
        CREATE CHAT BOT
      </Button>
    </div>
  );
};
