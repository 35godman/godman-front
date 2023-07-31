import React, { FC, useCallback, useState } from 'react';
import { Button, Input, message } from 'antd';
import globalService from '@/service/globalService';
import { Chatbot } from '@/types/models/globals';
import { debounceUtil } from '@/helpers/funcs/debounce';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useAppDispatch } from '@/features/store';
import { addFile } from '@/features/slices/charsCountSlice';
import { fileConfig } from '@/config/file.config';

type TextSourceProps = {
  chatbot: Chatbot;
  setChatbot: (chatbot: Chatbot) => void;
};

const TextSource: FC<TextSourceProps> = ({ chatbot }) => {
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
        placeholder="Введите текст"
        rows={15}
        value={textSource}
        onChange={handleTextAreaChange}
      />
      <PrimaryButton onclick={saveText} text={'Сохранить текст'} />
    </>
  );
};

export default TextSource;
