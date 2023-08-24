import { useEffect, useRef, useState } from 'react';
import { Chatbot, CrawlingStatus } from '@/types/models/globals';

export const useCrawlState = (status: CrawlingStatus) => {
  const [crawlStatus, setCrawlStatus] = useState<CrawlingStatus>(status);
  const [crawlLoading, setCrawlLoading] = useState<boolean>(false);
  const [crawlLoadingPercent, setCrawlLoadingPercent] = useState<number>(0);

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
  // useEffect(() => {
  //   setCrawlStatus(status);
  // }, [status]);
  return {
    crawlStatus,
    setCrawlStatus,
    crawlLoading,
    setCrawlLoading,
    crawlLoadingPercent,
    setCrawlLoadingPercent,
  };
};
