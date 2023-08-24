import { AxiosResponse } from 'axios';
import { CrawledLink } from '@/features/Crawled/crawledLink.type';
import crawlService from '@/shared/service/crawlService';
import { FileUpload } from '@/types/models/globals';

export const crawlWebsite = async (
  id: string,
  websiteUrl: string,
  linksToParse: string[],
  alreadyUploadedLinks: FileUpload[],
) => {
  return await crawlService.post(`/crawler/crawl?chatbot_id=${id}`, {
    weblink: websiteUrl,
    filter: linksToParse,
    alreadyUploadedLinks: alreadyUploadedLinks || [],
  });
};

export const deleteAll = async (id: string) => {
  return await crawlService.post(`/chatbot/reset-websources?chatbot_id=${id}`);
};

type deleteLinkBody = {
  web_link: string;
  chatbot_id: string;
  weblink_id: string;
};
export const deleteLink = async (id: string, body: deleteLinkBody) => {
  return await crawlService.post(
    `/file-upload/remove-crawled?chatbot_id=${id}`,
    body,
  );
};
