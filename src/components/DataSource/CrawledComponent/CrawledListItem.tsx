import React, { FC } from 'react';
import { FileUpload } from '@/types/models/globals';
import { Button, List, Typography } from 'antd';
import s from '@/components/DataSource/DataSource.module.css';
import { DeleteOutlined } from '@ant-design/icons';

type CrawledListItem = {
  item: FileUpload;
  deleteAlreadyUploadedLink: (item: FileUpload) => void;
  deleteLoading: boolean;
  style: React.CSSProperties;
  index: number;
};
const CrawledListItem: FC<CrawledListItem> = ({
  item,
  deleteAlreadyUploadedLink,
  deleteLoading,
  style,
  index,
}) => {
  const linkName = item.originalName.replace(/\[]/g, '/').slice(0, -4);
  const PADDING_SIZE = 100;
  const ITEM_SIZE = 5000;
  return (
    <>
      <List.Item
        style={{
          ...style,
          top: `${parseFloat(style.top as string) + PADDING_SIZE}px`,
        }}
        className={'flex justify-between items-center whitespace-nowrap'}
      >
        <Typography.Text mark className={s.crawledLinkHeading}>
          {linkName}
        </Typography.Text>
        {item.char_length}
        <Button
          onClick={() => deleteAlreadyUploadedLink(item)}
          loading={deleteLoading}
        >
          <DeleteOutlined />
        </Button>
      </List.Item>
    </>
  );
};

export default CrawledListItem;
