import React, { FC, useState } from 'react';
import s from '@/components/DataSource/DataSource.module.css';
import { Button, Input, List, message, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { AxiosResponse } from 'axios';
import { CrawledLink } from '@/components/DataSource/CrawledComponent/crawledLink.type';
import crawlService from '@/service/crawlService';
import { Chatbot, FileUpload } from '@/types/models/globals';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useAppDispatch } from '@/features/store';
import { addFile, removeFile } from '@/features/slices/charsCountSlice';

type CrawledComponentProps = {
  chatbot: Chatbot;
};

const CrawledComponent: FC<CrawledComponentProps> = ({ chatbot }) => {
  const dispatch = useAppDispatch();
  const [parsedContent, setParsedContent] = useState<CrawledLink[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [alreadyUploadedLinks, setAlreadyUploadedLinks] = useState<
    FileUpload[]
  >(() => chatbot.sources.website);

  const [crawlLoading, setCrawlLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleWebsiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
  };
  const handleWebsiteParse = async () => {
    message.loading('Ожидайте, контент с сайта загружается');
    setCrawlLoading(true);
    const res: AxiosResponse<CrawledLink[]> = await crawlService.post(
      `/crawler/crawl?chatbot_id=${chatbot._id}`,
      {
        weblink: websiteUrl,
      },
    );
    if (res.data) {
      setParsedContent(res.data);

      for (const webFile of res.data) {
        dispatch(
          addFile({
            id: webFile.url,
            chars: webFile.size,
          }),
        );
      }
    } else {
      message.error('Ошибка');
    }
    setCrawlLoading(false);
  };
  const deleteCrawledLink = async (link: CrawledLink) => {
    const removedParsedContent = [...parsedContent];
    const body = {
      weblink_id: link._id,
      web_link: link.url,
    };
    await crawlService.post(
      `/file-upload/remove-crawled?chatbot_id=${chatbot._id}`,
      body,
    );
    setParsedContent(
      removedParsedContent.filter((item) => item.url !== link.url),
    );
    dispatch(removeFile(link.url));
  };

  const deleteAlreadyUploadedLink = async (link: FileUpload) => {
    setDeleteLoading(true);
    const removedAlreadyUploadedLink = [...alreadyUploadedLinks];
    const body = {
      web_link: link.originalName,
      chatbot_id: chatbot._id,
      weblink_id: link._id,
    };
    await crawlService.post('/file-upload/remove-crawled', body);
    setAlreadyUploadedLinks(
      removedAlreadyUploadedLink.filter((item) => item._id !== link._id),
    );
    dispatch(removeFile(link._id));
    setDeleteLoading(false);
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
        />
      </div>
      <List
        dataSource={parsedContent}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark className={s.crawledLinkHeading}>
              {item.url}
            </Typography.Text>
            {item.size}
            <Button
              onClick={() => deleteCrawledLink(item)}
              loading={deleteLoading}
            >
              <DeleteOutlined />
            </Button>
          </List.Item>
        )}
      ></List>
      <List
        dataSource={alreadyUploadedLinks}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark className={s.crawledLinkHeading}>
              {item.originalName.replace(/\[]/g, '/')}
            </Typography.Text>
            {item.char_length}
            <Button
              onClick={() => deleteAlreadyUploadedLink(item)}
              loading={deleteLoading}
            >
              <DeleteOutlined />
            </Button>
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default CrawledComponent;
