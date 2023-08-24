import { useEffect, useState } from 'react';
import { Chatbot } from '@/types/models/globals';

export const usePreviewMessages = (chatbot: Chatbot) => {
  const [suggestMsgArr, setSuggestMsgArr] = useState<string[]>([]);
  const [initialMsgArr, setInitialMsgArr] = useState<string[]>([]);
  useEffect(() => {
    if (chatbot.settings.new_suggested_messages) {
      const arr = chatbot.settings.new_suggested_messages.split('\n');
      setSuggestMsgArr(arr);
    }
    if (chatbot.settings.new_initial_messages) {
      const arr = chatbot.settings.new_initial_messages.split('\n');
      setInitialMsgArr(arr);
    }
  }, [chatbot]);

  return {
    suggestMsgArr,
    initialMsgArr,
  };
};
