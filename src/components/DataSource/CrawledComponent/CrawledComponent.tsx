import React, { FC, useEffect, useState } from 'react';
import s from '@/components/DataSource/DataSource.module.css';
import { Input, message, Progress, Space, Typography } from 'antd';
import { AxiosResponse } from 'axios';
import { CrawledLink } from '@/components/DataSource/CrawledComponent/crawledLink.type';
import crawlService from '@/service/crawlService';
import { Chatbot, CrawlingStatus, FileUpload } from '@/types/models/globals';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useAppDispatch } from '@/features/store';
import { removeFile } from '@/features/slices/charsCountSlice';
import globalService from '@/service/globalService';
import { FixedSizeList as List } from 'react-window';
import { WrappedCrawledListItem } from '@/components/DataSource/CrawledComponent/WrapperCrawledListItem';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useIntl } from 'react-intl';
import CrawlFilter from '@/components/DataSource/CrawledComponent/CrawlFilter';

type CrawledComponentProps = {
  chatbot: Chatbot;
  getChatbot: () => Promise<Chatbot | undefined>;
};

const CrawledComponent: FC<CrawledComponentProps> = ({
  chatbot,
  getChatbot,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [linksToParse, setLinksToParse] = useState<string[]>([]);
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

  useEffect(() => {
    setAlreadyUploadedLinks(chatbot.sources.website);
  }, [chatbot]);

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
    message.loading(intl.formatMessage({ id: 'message.loading' }));
    setCrawlStatus('PENDING');
    setCrawlLoading(true);
    try {
      const res: AxiosResponse<CrawledLink[]> = await crawlService.post(
        `/crawler/crawl?chatbot_id=${chatbot._id}`,
        {
          weblink: websiteUrl,
          filter: linksToParse,
        },
      );
      if (res.status === 201) {
        await getChatbot();
      } else {
        message.error(intl.formatMessage({ id: 'message.error' }));
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
      message.success(intl.formatMessage({ id: 'message.success' }));
      await getChatbot();
    } else {
      message.error(intl.formatMessage({ id: 'message.error' }));
    }
    setDeleteLoading(false);
  };

  const deleteAlreadyUploadedLink = async (link: FileUpload) => {
    //setDeleteLoading(true);

    const removedAlreadyUploadedLink = [...alreadyUploadedLinks];
    const body = {
      web_link: link.originalName,
      chatbot_id: chatbot._id,
      weblink_id: link._id,
    };
    setAlreadyUploadedLinks(
      removedAlreadyUploadedLink.filter((item) => item._id !== link._id),
    );
    dispatch(removeFile(link._id));

    const response = await crawlService.post(
      `/file-upload/remove-crawled?chatbot_id=${chatbot._id}`,
      body,
    );
    if (response.status === 201) {
      message.success(intl.formatMessage({ id: 'message.success' }));
    } else {
      message.error(intl.formatMessage({ id: 'message.error' }));
    }
  };

  return (
    <>
      <div className={s.webInputWrap}>
        <Input
          placeholder={intl.formatMessage({
            id: 'crawledComponent.enter-weblink',
          })}
          value={websiteUrl}
          onChange={handleWebsiteUrlChange}
        />
        <PrimaryButton
          onclick={handleWebsiteParse}
          text={intl.formatMessage({ id: 'crawledComponent.crawl' })}
          loading={crawlLoading}
          disabled={!websiteUrl.length}
        />
      </div>
      <div className={'flex flex-col w-[50%] text-sm mt-5'}>
        <CrawlFilter
          linksToParse={linksToParse}
          setLinksToParse={setLinksToParse}
        />
      </div>
      <div className={'flex justify-end '}>
        <div className={'flex flex-col align-middle '}>
          <PrimaryButton
            onclick={deleteAll}
            loading={deleteLoading}
            text={intl.formatMessage({ id: 'crawledComponent.delete-all' })}
            disabled={!chatbot.sources.website.length}
          />
          <Typography>
            {intl.formatMessage({ id: 'crawledComponent.page-count' })}{' '}
            {alreadyUploadedLinks.length}
          </Typography>
        </div>
      </div>
      {
        <>
          <Space wrap className={'flex justify-center'}>
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
      <AutoSizer style={{ height: '300px' }}>
        {({ height, width }: { height: number; width: number }) => {
          return (
            <List
              itemCount={alreadyUploadedLinks.length}
              itemSize={35}
              itemData={alreadyUploadedLinks}
              height={height}
              width={width}
            >
              {WrappedCrawledListItem({
                data: alreadyUploadedLinks,
                deleteAlreadyUploadedLink: deleteAlreadyUploadedLink,
                deleteLoading: deleteLoading,
              })}
            </List>
          );
        }}
      </AutoSizer>
    </>
  );
};

export default CrawledComponent;
