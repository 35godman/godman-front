import { User } from '@/types/models/globals';
import { Language } from '@/types/enums/lang';

export const userStub = (): User => {
  return {
    chatbot_limit: 0,
    _id: '64dcef87a93415a31c0f3280',
    email: 'test@test.com',
    plan: 'free',
    username: 'test',
    password: 'test',
    createdAt: '2023-07-31T12:00:25.757+00:00',
    updatedAt: '2023-07-31T12:00:25.757+00:00',
    __v: 0,
    language: Language.RU,
  };
};
