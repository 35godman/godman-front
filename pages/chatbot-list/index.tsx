import React, { FC } from 'react';
import { ChatbotsList } from '@/components/ChatbotsList/ChatbotsList';
import Head from 'next/head';
const ChatbotListPage: FC = () => {
  return (
    <>
      {/*<iframe*/}
      {/*  src="http://localhost:3000/chatbot-iframe/64cd0ca018e6d0abf364f209"*/}
      {/*  width="100%"*/}
      {/*  id="godman-chatbot"*/}
      {/*></iframe>*/}
      {/*<script*/}
      {/*  src="http://localhost:5050/static/scripts/embed-script.js"*/}
      {/*  defer*/}
      {/*></script>*/}
      <ChatbotsList />
    </>
  );
};
export default ChatbotListPage;
