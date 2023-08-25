import React, { FC, useState } from 'react';
import { Input, message } from 'antd';
import globalService from '@/shared/service/globalService';
import { Chatbot } from '@/types/models/globals';
import PrimaryButton from '@/entities/PrimaryButton/PrimaryButton';
import { useAppDispatch } from '@/app/store/store';
import { addFile } from '@/app/store/slices/charsCountSlice';
import { fileConfig } from '@/config/file.config';
import { useIntl } from 'react-intl';

type TextSourceProps = {
  chatbot: Chatbot;
  setChatbot: (chatbot: Chatbot) => void;
};

const TextSource: FC<TextSourceProps> = ({ chatbot }) => {
  const intl = useIntl();
  const { TextArea } = Input;
  const dispatch = useAppDispatch();
  const [textSource, setTextSource] = useState<string>(chatbot.sources.text);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextSource(e.target.value);
    dispatch(
      addFile({
        /**
         * @COMMENT
         * creating a uuid file for text, cause the whole slice is based on id/chars structure
         */
        id: fileConfig.textFileGlobalState.id,
        chars: e.target.value.length,
      }),
    );
  };

  const saveText = async () => {
    setUploadLoading(true);
    await globalService.post(
      `/file-upload/source-text-upload?chatbot_id=${chatbot._id}`,
      { data: textSource },
    );
    setUploadLoading(false);
    message.info('Успешно обновлен текст');
  };
  return (
    <>
      <TextArea
        placeholder={intl.formatMessage({ id: 'textSource.enter-text' })}
        rows={15}
        value={textSource}
        onChange={handleTextAreaChange}
      />
      <PrimaryButton
        onclick={saveText}
        text={intl.formatMessage({ id: 'textSource.save-text' })}
        loading={uploadLoading}
      />
    </>
  );
};

export default TextSource;
