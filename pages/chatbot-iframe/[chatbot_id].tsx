import React, { useEffect, useRef, useState } from 'react';
import { ChatBot } from '@/components/ChatBot/ChatBot';
import { useRouter } from 'next/router';
import { Chatbot } from '@/types/models/globals';
import { AxiosResponse } from 'axios';
import globalService from '@/service/globalService';
import ChatbotContainer from '@/components/ChatBot/ChatbotContainer';

const ChatbotIframe = () => {
  const router = useRouter();

  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const fetchedRef = useRef(false);
  useEffect(() => {
    const { chatbot_id } = router.query;
    const getChatbotSettings = async () => {
      if (chatbot_id && !fetchedRef.current) {
        fetchedRef.current = true;
        const response: AxiosResponse<Chatbot> = await globalService.get(
          `/chatbot/iframe?chatbot_id=${chatbot_id}`,
        );

        setChatbot(response.data);
      }
    };
    getChatbotSettings();
  }, [router, fetchedRef]);

  return (
    <>{chatbot && <ChatbotContainer chatbot={chatbot} isIframe={true} />}</>
  );
};
//eslint-disable-next-line
// @ts-ignore
export async function getServerSideProps(context) {
  context.res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'self' example.com",
  );

  return { props: { noLayout: true } };
}
export default ChatbotIframe;
