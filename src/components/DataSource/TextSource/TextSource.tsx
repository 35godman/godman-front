import React, { FC, useCallback, useState } from 'react';
import { Button, Input } from 'antd';
import globalService from '@/service/globalService';
import { Chatbot } from '@/types/models/globals';
import { debounceUtil } from '@/helpers/funcs/debounce';

type TextSourceProps = {
  chatbot: Chatbot;
  setChatbot: (chatbot: Chatbot) => void;
};

const TextSource: FC<TextSourceProps> = ({ chatbot }) => {
  const { TextArea } = Input;
  const [textSource, setTextSource] = useState<string>(chatbot.sources.text);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextSource(e.target.value);
  };

  const saveText = async () => {
    await globalService.post(
      `/file-upload/source-text-upload?chatbot_id=${chatbot._id}`,
      { data: textSource },
    );
  };
  return (
    <>
      <TextArea
        placeholder="Введите текст"
        rows={15}
        value={textSource}
        onChange={handleTextAreaChange}
      />
      <Button onClick={saveText}>Сохранить текст</Button>
    </>
  );
};

export default TextSource;
