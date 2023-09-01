import React, { FC, useEffect, useState } from 'react';
import PrimaryButton from '@/entities/PrimaryButton/PrimaryButton';
import { Chatbot } from '@/types/models/globals';
import { domainConfig } from '@/config/domain.config';
import { ConfigProvider, DatePicker } from 'antd';

import 'dayjs/locale/ru';
import locale from 'antd/locale/ru_RU';

const { RangePicker } = DatePicker;
type ExportConversationProps = {
  chatbot: Chatbot;
};
type SelectedDate = {
  start: string;
  end: string;
};

const ExportConversations: FC<ExportConversationProps> = ({ chatbot }) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [disabledFetching, setDisabledFetching] = useState<boolean>(false);
  const [dateSelected, setDateSelected] = useState<SelectedDate | null>(null);

  useEffect(() => {
    if (!dateSelected || !dateSelected?.end || !dateSelected?.start) {
      setDisabledFetching(true);
    } else {
      setDisabledFetching(false);
    }
  }, [dateSelected]);
  const fetchConversations = async () => {
    setFetching(true);
    try {
      const response = await fetch(
        `${domainConfig.BACKEND_DOMAIN_NAME}/v1/conversation/export?chatbot_id=${chatbot._id}&from=${dateSelected?.start}&to=${dateSelected?.end}`,
        {
          method: 'GET',
        },
      );
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${chatbot._id}.pdf`;
      link.click();
      setFetching(false);
      URL.revokeObjectURL(link.href);
    } catch (e) {
      setFetching(false);
    }
  };
  type RangeValue = Parameters<
    NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
  >[0];

  const onDateChange = (date: RangeValue, dateString: [string, string]) => {
    setDateSelected({
      start: dateString[0],
      end: dateString[1],
    });
  };
  return (
    <div>
      <ConfigProvider locale={locale}>
        <RangePicker onChange={onDateChange} />
        <PrimaryButton
          onclick={fetchConversations}
          loading={fetching}
          disabled={disabledFetching}
        >
          Скачать
        </PrimaryButton>
      </ConfigProvider>
    </div>
  );
};

export default ExportConversations;
