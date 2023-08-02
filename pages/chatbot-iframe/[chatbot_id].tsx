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
    const { chatbot_id } = router.query;
    const getChatbotSettings = async () => {
      if (chatbot_id && !fetchedRef.current) {
        fetchedRef.current = true;
        const response: AxiosResponse<Chatbot> = await globalService.get(
          `/chatbot/find?chatbot_id=${chatbot_id}`,
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
