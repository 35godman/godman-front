import React, { FC } from 'react';
import { Progress, Space } from 'antd';

type CrawlProgressProps = {
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | null;
  percent: number;
};
const CrawlProgress: FC<CrawlProgressProps> = ({ status, percent }) => {
  return (
    <>
      <Space wrap className={'flex justify-center'}>
        {status === 'PENDING' && (
          <Progress
            type="circle"
            size={'small'}
            percent={percent}
            strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
            status={'active'}
          />
        )}
        {status === 'COMPLETED' && (
          <Progress
            size={'small'}
            type="circle"
            percent={100}
            strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
            status={'success'}
          />
        )}
        {status === 'FAILED' && (
          <Progress
            type="circle"
            strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
            status={'exception'}
          />
        )}
      </Space>
    </>
  );
};

export default CrawlProgress;
