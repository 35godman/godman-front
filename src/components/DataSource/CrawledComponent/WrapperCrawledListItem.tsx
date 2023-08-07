import CrawledListItem from '@/components/DataSource/CrawledComponent/CrawledListItem';
import { FileUpload } from '@/types/models/globals';
import React from 'react';

type WrappedCrawledListItemProps = {
  data: FileUpload[];
  deleteAlreadyUploadedLink: (link: FileUpload) => void;
  deleteLoading: boolean;
};

const InnerCrawledListItem = (
  { index, style }: { index: number; style: React.CSSProperties },
  props: WrappedCrawledListItemProps,
) => {
  const item = props.data[index];
  return (
    <CrawledListItem
      style={style}
      item={item}
      deleteAlreadyUploadedLink={props.deleteAlreadyUploadedLink}
      deleteLoading={props.deleteLoading}
      index={index}
    />
  );
};
InnerCrawledListItem.displayName = 'InnerCrawledListItem';

export const WrappedCrawledListItem = (props: WrappedCrawledListItemProps) => {
  return (indexProps: { index: number; style: React.CSSProperties }) =>
    InnerCrawledListItem(indexProps, props);
};
WrappedCrawledListItem.displayName = 'WrappedCrawledListItem';
