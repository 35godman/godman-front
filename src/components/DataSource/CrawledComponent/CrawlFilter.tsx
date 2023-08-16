import React, { FC, useState } from 'react';
import { Button, Input, List, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { FormattedMessage } from 'react-intl';

type CrawlFilterProps = {
  linksToParse: string[];
  setLinksToParse: (links: string[]) => void;
};

const CrawlFilter: FC<CrawlFilterProps> = ({
  linksToParse,
  setLinksToParse,
}) => {
  const [currentLink, setCurrentLink] = useState<string>('');

  const addToLinksToParse = () => {
    setLinksToParse([...linksToParse, currentLink]);
    setCurrentLink('');
  };
  const removeFromLinksToParse = (removed: string) => {
    const filteredLinks = linksToParse.filter((link) => link !== removed);
    setLinksToParse(filteredLinks);
  };
  return (
    <>
      <div>
        <Input onChange={(e) => setCurrentLink(e.target.value)} />
        <PrimaryButton onclick={addToLinksToParse}>
          <FormattedMessage id={'crawlFilter.addToFilter'} />
        </PrimaryButton>
        <List
          dataSource={linksToParse}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>{item}</Typography.Text>
              <Button onClick={() => removeFromLinksToParse(item)}>
                <DeleteOutlined />
              </Button>
            </List.Item>
          )}
        ></List>
      </div>
    </>
  );
};

export default CrawlFilter;
