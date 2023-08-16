import { ChatbotSources } from '@/types/models/globals';

export const sourcesStub = (): ChatbotSources => {
  return {
    chatbot_id: '64d26bc3e5387df06821bdcb', // Casting to any for simplification
    files: [], // Empty array as default
    text: '',
    website: [], // Empty array as default
    crawling_status: null,
    last_crawled_data: null,
    QA_list: [], // Empty array as default
  } as unknown as ChatbotSources; // Two-step type assertion to ensure compatibility
};
