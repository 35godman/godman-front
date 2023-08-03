import { VisibilityOptions } from '@/types/models/chatbotCustom/visibility.type';
import { EmbeddedCode } from '@/types/models/chatbotCustom/embed-code.type';
import { QAState } from '@/types/models/chatbotCustom/QA.type';
import { MessageState } from '@/types/models/chatbotCustom/messageState';
import { LimitState } from '@/types/models/chatbotCustom/limit.type';
import { CustomerInfo } from '@/types/models/chatbotCustom/customer-info.type';
import { Language } from '@/types/enums/lang';
export type User = {
  _id: string;

  email: string;

  plan: 'premium' | 'free';

  username: string;

  password: string;

  chatbot_limit: number;

  language: Language;

  createdAt: string;

  updatedAt: string;

  __v: number;
};

export type FileUpload = {
  _id: string;

  originalName: string;

  storagePath: string;

  chatbot: Chatbot;

  char_length: number;
};
export type Conversation = {
  chatbot_id: Chatbot;

  messages: MessageState[];

  source: string;
};
export type Chatbot = {
  _id: string;

  chatbot_name: string;

  owner: User;

  settings: ChatbotSettings;

  conversations: Conversation[];

  sources: ChatbotSources;

  embed_code: EmbeddedCode;

  share_link: string;
};
export type CrawlingStatus = null | 'FAILED' | 'PENDING' | 'COMPLETED';
export type ChatbotSources = {
  id: string;

  files: FileUpload[];

  text: string;

  website: FileUpload[];

  crawling_status: CrawlingStatus;

  QA_list: QAState[];
};

export type ChatbotSettings = {
  model: string;

  language: string;

  num_of_characters: number;

  char_limit: number;

  max_tokens: number;

  temperature: number;

  base_prompt: string;

  visibility: VisibilityOptions;

  domains: string[];

  new_domains: string;

  rate_limit: LimitState;

  customer_info: CustomerInfo;

  initial_messages: string[];

  new_initial_messages: string;

  suggested_messages: string[];

  new_suggested_messages: string;

  theme: 'light' | 'dark';

  profile_picture_path: string;

  remove_profile_picture_checked: boolean;

  display_name: string;

  user_message_color: string;

  bot_message_color: string;

  chat_icon_path: string;

  chat_bubble_color: string;

  show_initial_messages_timeout: number;
};

export type ChatbotConversations = {
  chatbot_id: Chatbot;

  conversations: Conversation[];
};
