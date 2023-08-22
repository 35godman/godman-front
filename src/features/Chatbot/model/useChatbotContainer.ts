// features/Chatbot/model/useChatbotContainer.ts
import { useState } from 'react';
import { getConversationSource } from '../api';

export const useChatbotContainer = (chatbotId: string) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false);
  const [vectorsUsed, setVectorsUsed] = useState<string>('');
  const [isViewSourceAvailable, setIsViewSourceAvailable] =
    useState<boolean>(false);

  const showMessageSource = async () => {
    if (!isCollapseOpen) {
      setVectorsUsed('');
      const conversationId = localStorage.getItem('conversationId');
      if (conversationId && chatbotId) {
        const conversationSource = await getConversationSource(
          chatbotId,
          conversationId,
        );
        setVectorsUsed(conversationSource.data.source);
      }
    }
    setIsCollapseOpen((prevState) => !prevState);
  };

  return {
    vectorsUsed,
    isViewSourceAvailable,
    showMessageSource,
    setIsViewSourceAvailable,
  };
};
