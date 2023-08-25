import React, { FC, useState } from 'react';
import { Button, Input, List, Typography } from 'antd';
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
  return (
    <>
      <div className={'flex flex-col w-[50%] text-sm mt-5'}>
        <div>
          <Input
            onChange={(e) => setCurrentLink(e.target.value)}
            value={currentLink}
          />
          <PrimaryButton onclick={() => addToLinks()}>
            <FormattedMessage id={'crawlFilter.addToFilter'} />
          </PrimaryButton>
          <List
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
