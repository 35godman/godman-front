import React, { FC } from 'react';
import { ChatbotsList } from '@/components/ChatbotsList/ChatbotsList';
import Head from 'next/head';
const ChatbotListPage: FC = () => {
  return (
    <>
      <ChatbotsList />
    </>
  );
};
export default ChatbotListPage;
