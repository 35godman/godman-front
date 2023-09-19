import React, { FC, useState } from 'react';
import { Typography } from 'antd';
import { Chatbot } from '@/types/models/globals';
import PrimaryButton from '@/entities/PrimaryButton/PrimaryButton';
import { FixedSizeList as List } from 'react-window';
import { WrappedCrawledListItem } from '@/features/Crawled/ui/WrapperCrawledListItem';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useIntl } from 'react-intl';
import CrawlFilter from '@/features/Crawled/CrawlFilter';
import WebInput from '@/features/Crawled/ui/WebInput';
import CrawlProgress from '@/features/Crawled/ui/CrawlProgress';
import { useCrawlState } from '@/features/Crawled/model/useCrawlState';
import { useUploadedLinks } from '@/features/Crawled/model/useUploadedLinks';
import useCrawlActions from '@/features/Crawled/model/useCrawlActions';

type CrawledComponentProps = {
  chatbot: Chatbot;
  getChatbot: () => Promise<Chatbot | undefined>;
};

const Crawled: FC<CrawledComponentProps> = ({ chatbot, getChatbot }) => {
  const intl = useIntl();

  const {
    crawlLoading,
    crawlLoadingPercent,
    crawlStatus,
    setCrawlLoadingPercent,
    setCrawlStatus,
    setCrawlLoading,
  } = useCrawlState(chatbot.sources.crawling_status);

  const { alreadyUploadedLinks, setAlreadyUploadedLinks } = useUploadedLinks(
    chatbot.sources.website,
  );

  const [linksToParse, setLinksToParse] = useState<string[]>([]);

  const {
    handleWebsiteParse,
    deleteAlreadyUploadedLink,
    deleteLoading,
    deleteAllHandler,
  } = useCrawlActions({
    chatbot,
    getChatbot,
    setCrawlStatus,
    setCrawlLoading,
    setCrawlLoadingPercent,
    alreadyUploadedLinks,
    setAlreadyUploadedLinks,
  });
  return (
    <>
      <WebInput
        onclick={handleWebsiteParse}
        loading={crawlLoading}
        linksToParse={linksToParse}
      />
      <CrawlFilter
        linksToParse={linksToParse}
        setLinksToParse={setLinksToParse}
      />

      <div className={'flex justify-end '}>
        <div className={'flex flex-col align-middle '}>
          <PrimaryButton
            onclick={deleteAllHandler}
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
      <CrawlProgress status={crawlStatus} percent={crawlLoadingPercent} />
      <AutoSizer style={{ height: '100px' }}>
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

export default Crawled;
