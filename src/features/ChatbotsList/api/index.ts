import { AxiosResponse } from 'axios';
import { Chatbot } from '@/types/models/globals';
import globalService from '@/shared/service/globalService';

export const getChatbotsByUserId = async (id: string) => {
  if (id) {
    const response: AxiosResponse<Chatbot[]> = await globalService.get(
      `/chatbot/find/user/${id}`,
    );
    return response.data;
  }
  return [];
};
export const createChatbot = async (id: string) => {
  const response: AxiosResponse<Chatbot> = await globalService.post(
    '/chatbot/create-default',
    {
      user_id: id,
    },
  );
  return response.data;
};
