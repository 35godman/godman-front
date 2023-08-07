import React, { FC } from 'react';
import { ChatbotsList } from '@/components/ChatbotsList/ChatbotsList';
import Head from 'next/head';
const ChatbotListPage: FC = () => {
  return (
    <>
      <Head>
        <script
          src="http://localhost:5050/static/scripts/embed-script.js"
          defer
        ></script>
      </Head>
      <div>
        <iframe
          src="http://localhost:3000/chatbot-iframe/64d0d27d147e3c224f1a9528"
          width="100%"
          style={{ height: '100%', minHeight: '700px' }}
          id="godman-chatbot"
        ></iframe>
      </div>
      <ChatbotsList />
    </>
  );
};
export default ChatbotListPage;
