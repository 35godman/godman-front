import React, { FC, useState } from 'react';
import s from '@/components/DataSource/DataSource.module.css';
import { Input } from 'antd';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useIntl } from 'react-intl';

type WebInputProps = {
  onclick: (websiteUrl: string, linksToParse: string[]) => Promise<void>;
  loading: boolean;
  linksToParse: string[];
};

const WebInput: FC<WebInputProps> = ({ onclick, loading, linksToParse }) => {
  const intl = useIntl();
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const handleWebsiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
  };
  return (
    <div className={s.webInputWrap}>
      <Input
        placeholder={intl.formatMessage({
          id: 'crawledComponent.enter-weblink',
        })}
        value={websiteUrl}
        onChange={handleWebsiteUrlChange}
      />
      <PrimaryButton
        onclick={() => onclick(websiteUrl, linksToParse)}
        text={intl.formatMessage({ id: 'crawledComponent.crawl' })}
        loading={loading}
        disabled={!websiteUrl.length}
      />
    </div>
  );
};

export default WebInput;
