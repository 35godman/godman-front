import React, { FC, useState } from 'react';
import s from '@/components/DataSource/DataSource.module.css';
import { Button, Input, List, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { AxiosResponse } from 'axios/index';
import { CrawledLink } from '@/components/DataSource/crawledLink.type';
import crawlService from '@/service/crawlService';
import { Chatbot, FileUpload } from '@/types/models/globals';
import { WebContent } from '@/types/models/chatbotCustom/web-content.type';

type CrawledComponentProps = {
  chatbot: Chatbot;
};

const CrawledComponent: FC<CrawledComponentProps> = ({ chatbot }) => {
  const [parsedContent, setParsedContent] = useState<CrawledLink[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [alreadyUploadedLinks, setAlreadyUploadedLinks] = useState<
    FileUpload[]
  >(() => chatbot.sources.website);
  console.log(
    '=>(CrawledComponent.tsx:21) alreadyUploadedLinks',
    alreadyUploadedLinks,
  );
  const handleWebsiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
  };
  const handleWebsiteParse = async () => {
    try {
      const res: AxiosResponse<CrawledLink[]> = await crawlService.post(
        '/crawler/crawl',
        {
          weblink: websiteUrl,
          chatbot_id: chatbot._id,
        },
      );
      setParsedContent(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCrawledLink = async (link: CrawledLink) => {
    const removedParsedContent = [...parsedContent];
    const body = {
      web_link: link.url,
      chatbot_id: chatbot._id,
    };
    await crawlService.post('/file-upload/remove-crawled', body);
    setParsedContent(
      removedParsedContent.filter((item) => item.url !== link.url),
    );
  };

  const deleteAlreadyUploadedLink = async (link: FileUpload) => {
    console.log('=>(CrawledComponent.tsx:61) link', link);
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
