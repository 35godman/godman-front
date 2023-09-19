import React, { FC, useState } from 'react';
import { Button, Input, List, Tooltip, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PrimaryButton from '@/entities/PrimaryButton/PrimaryButton';
import { FormattedMessage } from 'react-intl';
import { useFilterLinksToParse } from '@/features/Crawled/model/useFilterLinksToParse';

type CrawlFilterProps = {
  linksToParse: string[];
  setLinksToParse: (links: string[]) => void;
};

const CrawlFilter: FC<CrawlFilterProps> = ({
  linksToParse,
  setLinksToParse,
}) => {
  const { currentLink, setCurrentLink, removeFromLinks, addToLinks } =
    useFilterLinksToParse(linksToParse, setLinksToParse);

  const locale = {
    emptyText: <></>,
  };
  return (
    <>
      <div className={'flex flex-col w-[50%] text-sm mt-5'}>
        <div>
          <div className={'flex items-center'}>
            <Input
              onChange={(e) => setCurrentLink(e.target.value)}
              value={currentLink}
            />
            <Tooltip title="prompt text">
              <span>TIp</span>
            </Tooltip>
          </div>

          <PrimaryButton onclick={() => addToLinks()}>
            <FormattedMessage id={'crawlFilter.addToFilter'} />
          </PrimaryButton>
          <List
            locale={locale}
            footer={false}
            dataSource={linksToParse}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>{item}</Typography.Text>
                <Button onClick={() => removeFromLinks(item)}>
                  <DeleteOutlined />
                </Button>
              </List.Item>
            )}
          ></List>
        </div>
      </div>
    </>
  );
};

export default CrawlFilter;
