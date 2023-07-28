import React, { FC, useState } from 'react';
import s from '@/components/DataSource/DataSource.module.css';
import { Button, Input, List, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { AxiosResponse } from 'axios/index';
import { CrawledLink } from '@/components/DataSource/CrawledComponent/crawledLink.type';
import crawlService from '@/service/crawlService';
import { Chatbot, FileUpload } from '@/types/models/globals';
import { WebContent } from '@/types/models/chatbotCustom/web-content.type';
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
  const handleWebsiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
  };
  const handleWebsiteParse = async () => {
    const res: AxiosResponse<CrawledLink[]> = await crawlService.post(
      '/crawler/crawl',
      {
        weblink: websiteUrl,
        chatbot_id: chatbot._id,
      },
    );
    setParsedContent(res.data);
    for (const webFile of res.data) {
      dispatch(
        addFile({
          id: webFile.url,
          chars: webFile.size,
        }),
      );
    }
  };
  const deleteCrawledLink = async (link: CrawledLink) => {
    const removedParsedContent = [...parsedContent];
    const body = {
      weblink_id: link._id,
      web_link: link.url,
      chatbot_id: chatbot._id,
    };
    await crawlService.post('/file-upload/remove-crawled', body);
    setParsedContent(
      removedParsedContent.filter((item) => item.url !== link.url),
    );
    dispatch(removeFile(link.url));
  };

  const deleteAlreadyUploadedLink = async (link: FileUpload) => {
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
        <PrimaryButton onclick={handleWebsiteParse} text={'Parse website'} />
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
      <List
        dataSource={alreadyUploadedLinks}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark className={s.crawledLinkHeading}>
              {item.originalName.replace(/\[]/g, '/')}
            </Typography.Text>
            {item.char_length}
            <Button onClick={() => deleteAlreadyUploadedLink(item)}>
              <DeleteOutlined />
            </Button>
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default CrawledComponent;
