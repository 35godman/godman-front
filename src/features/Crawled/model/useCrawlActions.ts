import { Chatbot, CrawlingStatus, FileUpload } from '@/types/models/globals';
import { useCrawlState } from '@/features/Crawled/model/useCrawlState';
import { useUploadedLinks } from '@/features/Crawled/model/useUploadedLinks';
import { useAppDispatch } from '@/app/store/store';
import { useIntl } from 'react-intl';
import { message } from 'antd';
import { AxiosResponse } from 'axios/index';
import { CrawledLink } from '@/features/Crawled/crawledLink.type';
import crawlService from '@/shared/service/crawlService';
import { removeFile, resetChars } from '@/app/store/slices/charsCountSlice';
import { useState } from 'react';
import { crawlWebsite, deleteAll, deleteLink } from '@/features/Crawled/api';

type useCrawlActionsArgs = {
  chatbot: Chatbot;
  getChatbot: () => Promise<Chatbot | undefined>;
  setCrawlStatus: (status: CrawlingStatus) => void;
  setCrawlLoading: (load: boolean) => void;
  setCrawlLoadingPercent: (percent: number) => void;
  setAlreadyUploadedLinks: (links: FileUpload[]) => void;
  alreadyUploadedLinks: FileUpload[];
};

const useCrawlActions = (args: useCrawlActionsArgs) => {
  const {
    chatbot,
    getChatbot,
    setCrawlStatus,
    setCrawlLoading,
    setCrawlLoadingPercent,
    alreadyUploadedLinks,
    setAlreadyUploadedLinks,
  } = args;
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const intl = useIntl();

  const handleWebsiteParse = async (
    websiteUrl: string,
    linksToParse: string[],
  ) => {
    message.loading(intl.formatMessage({ id: 'message.loading' }));
    setCrawlStatus('PENDING');
    setCrawlLoading(true);
    try {
      const res = await crawlWebsite(
        chatbot._id,
        websiteUrl,
        linksToParse,
        alreadyUploadedLinks,
      );
      if (res.status === 201) {
        message.success(intl.formatMessage({ id: 'message.success' }));
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

  const deleteAllHandler = async () => {
    setDeleteLoading(true);
    dispatch(resetChars());
    const response = await deleteAll(chatbot._id);
    if (response.status === 201) {
      setAlreadyUploadedLinks([]);
      message.success(intl.formatMessage({ id: 'message.success' }));
      await getChatbot();
    } else {
      message.error(intl.formatMessage({ id: 'message.error' }));
    }
    setDeleteLoading(false);
  };

  const deleteAlreadyUploadedLink = async (link: FileUpload) => {
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
    const response = await deleteLink(chatbot._id, body);
    if (response.status === 201) {
      message.success(intl.formatMessage({ id: 'message.success' }));
    } else {
      message.error(intl.formatMessage({ id: 'message.error' }));
    }
  };

  return {
    handleWebsiteParse,
    deleteAllHandler,
    deleteAlreadyUploadedLink,
    deleteLoading,
  };
};

export default useCrawlActions;
