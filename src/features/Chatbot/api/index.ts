import globalService from '@/shared/service/globalService';
import { MessageState } from '@/types/models/chatbotCustom/messageState';

export const getConversationSource = async (
  chatbot_id: string,
  conversation_id: string,
) => {
  return await globalService.get(
    `/conversation/show-latest-source?chatbot_id=${chatbot_id}&conversation_id=${conversation_id}`,
  );
};

export type ChatStreamBody = {
  question: string;
  chatbot_id: string;
  conversation_id: string | null;
  messages: MessageState[];
};

export const chatStream = async (body: ChatStreamBody) => {
  return await fetch('/api/chat-stream', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
