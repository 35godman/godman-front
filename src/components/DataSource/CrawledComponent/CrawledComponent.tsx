import React, { FC, useEffect, useState } from 'react';
import s from '@/components/DataSource/DataSource.module.css';
import {
  Button,
  Input,
  List,
  message,
  Progress,
  Space,
  Typography,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { AxiosResponse } from 'axios';
import { CrawledLink } from '@/components/DataSource/CrawledComponent/crawledLink.type';
import crawlService from '@/service/crawlService';
import { Chatbot, CrawlingStatus, FileUpload } from '@/types/models/globals';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useAppDispatch } from '@/features/store';
import { addFile, removeFile } from '@/features/slices/charsCountSlice';
import { useRouter } from 'next/router';
import globalService from '@/service/globalService';

type CrawledComponentProps = {
  chatbot: Chatbot;
  getChatbot: () => Promise<Chatbot | undefined>;
};

const CrawledComponent: FC<CrawledComponentProps> = ({
  chatbot,
  getChatbot,
}) => {
  const dispatch = useAppDispatch();
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [alreadyUploadedLinks, setAlreadyUploadedLinks] = useState<
    FileUpload[]
  >(() => chatbot.sources.website);

  const [crawlStatus, setCrawlStatus] = useState<CrawlingStatus>(
    chatbot.sources.crawling_status,
  );
  useEffect(() => {
    setCrawlStatus(chatbot.sources.crawling_status);
  }, [chatbot]);

  const [crawlLoading, setCrawlLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [crawlLoadingPercent, setCrawlLoadingPercent] = useState<number>(0);
  console.log(
    '=>(CrawledComponent.tsx:48) crawlLoadingPercent',
    crawlLoadingPercent,
  );

  useEffect(() => {
    let timer: unknown;
    if (crawlLoading) {
      timer = setInterval(() => {
        if (crawlLoadingPercent < 99 && crawlStatus === 'PENDING') {
          setCrawlLoadingPercent((prevState) => prevState + 1);
        } else if (timer) {
          setCrawlLoadingPercent(0);
          clearInterval(timer as NodeJS.Timer);
        }
      }, 1200);
    }
    return () => {
      clearInterval(timer as NodeJS.Timer);
    }; // Clear interval on component unmount
  }, [crawlLoading, crawlLoadingPercent, crawlStatus]);

  const handleWebsiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
  };
  const handleWebsiteParse = async () => {
    message.loading('Ожидайте, контент с сайта загружается');
    setCrawlStatus('PENDING');
    setCrawlLoading(true);
    try {
      const res: AxiosResponse<CrawledLink[]> = await crawlService.post(
        `/crawler/crawl?chatbot_id=${chatbot._id}`,
        {
          weblink: websiteUrl,
        },
      );
      if (res.data) {
        await getChatbot();
      } else {
        message.error('Ошибка');
      }
      setCrawlLoading(false);
      setCrawlLoadingPercent(0);
    } catch (e) {
      setCrawlLoading(false);
      setCrawlLoadingPercent(0);
    }
  };

  const deleteAll = async () => {
    setDeleteLoading(true);
    const response = await globalService.post(
      `/chatbot/reset-websources?chatbot_id=${chatbot._id}`,
    );
    if (response.status === 201) {
      message.success('Успешно удалено');
      await getChatbot();
    }
    setDeleteLoading(false);
  };

  const deleteAlreadyUploadedLink = async (link: FileUpload) => {
    setDeleteLoading(true);
    const removedAlreadyUploadedLink = [...alreadyUploadedLinks];
    const body = {
      web_link: link.originalName,
      chatbot_id: chatbot._id,
      weblink_id: link._id,
    };

    const response = await crawlService.post(
      `/file-upload/remove-crawled?chatbot_id=${chatbot._id}`,
      body,
    );
    if (response.status === 201) {
      setAlreadyUploadedLinks(
        removedAlreadyUploadedLink.filter((item) => item._id !== link._id),
      );
      dispatch(removeFile(link._id));
      setDeleteLoading(false);
      await getChatbot();
    }
  };

  return (
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
        <PrimaryButton
          onclick={handleWebsiteParse}
          text={'Parse website'}
          loading={crawlLoading}
          disabled={!websiteUrl.length}
        />
      </div>
      <div className={'flex justify-end '}>
        <div className={'flex flex-col align-middle '}>
          <PrimaryButton
            onclick={deleteAll}
            loading={deleteLoading}
            text={'Удалить все'}
            disabled={!chatbot.sources.website.length}
          />
          <Typography>
            Кол-во страниц {chatbot.sources.website.length}
          </Typography>
        </div>
      </div>
      {
        <>
          <Space wrap>
            {crawlStatus === 'PENDING' && (
              <Progress
                type="circle"
                size={'small'}
                percent={crawlLoadingPercent}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                status={'active'}
              />
            )}
            {crawlStatus === 'COMPLETED' && (
              <Progress
                size={'small'}
                type="circle"
                percent={100}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                status={'success'}
              />
            )}
            {crawlStatus === 'FAILED' && (
              <Progress
                type="circle"
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                status={'exception'}
              />
            )}
          </Space>
        </>
      }
      <List
        dataSource={chatbot.sources.website}
        renderItem={(item) => {
          const linkName = item.originalName.replace(/\[]/g, '/').slice(0, -4);

          return (
            <List.Item>
              <Typography.Text mark className={s.crawledLinkHeading}>
                {linkName}
              </Typography.Text>
              {item.char_length}
              <Button
                onClick={() => deleteAlreadyUploadedLink(item)}
                loading={deleteLoading}
              >
                <DeleteOutlined />
              </Button>
            </List.Item>
          );
        }}
      ></List>
    </>
  );
};

export default CrawledComponent;
