import React, { useEffect, useRef, useState } from 'react';
import { ChatBot } from '@/components/ChatBot/ChatBot';
import { useRouter } from 'next/router';
import { Chatbot } from '@/types/models/globals';
import { AxiosResponse } from 'axios';
import globalService from '@/service/globalService';

const ChatbotIframe = () => {
  const router = useRouter();

  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const fetchedRef = useRef(false);
  useEffect(() => {
    const id = router.query.chatbot_id;
    const getChatbotSettings = async () => {
      if (id && !fetchedRef.current) {
        fetchedRef.current = true;
        const response: AxiosResponse<Chatbot> = await globalService.get(
          `/chatbot/find/${id}`,
        );

        setChatbot(response.data);
      }
    };
    getChatbotSettings();
  }, [router, fetchedRef]);

  return <>{chatbot && <ChatBot chatbot={chatbot} />}</>;
};

ChatbotIframe.getInitialProps = async () => {
  return {
    noLayout: true,
  };
};

export default ChatbotIframe;
