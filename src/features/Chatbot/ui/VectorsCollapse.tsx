import { Collapse, CollapseProps, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';
import React, { FC } from 'react';

export type VectorsCollapseProps = {
  vectorsUsed: string;
  showMessageSource: () => Promise<void>;
  isViewSourceAvailable: boolean;
};

export const VectorsCollapse: FC<VectorsCollapseProps> = ({
  vectorsUsed,
  showMessageSource,
  isViewSourceAvailable,
}) => {
  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: <FormattedMessage id={'chatbot.show-source'} />,
      children: (
        <>{vectorsUsed ? <p>{vectorsUsed}</p> : <Spin size={'small'} />}</>
      ),
    },
  ];
  return (
    <>
      <div>
        {isViewSourceAvailable && (
          <Collapse items={collapseItems} onChange={showMessageSource} />
        )}
      </div>
    </>
  );
};
