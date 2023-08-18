import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Chatbot } from '@/types/models/globals';
import { AxiosResponse } from 'axios';
import globalService from '@/shared/service/globalService';
import ChatbotContainer from '@/components/ChatBot/ChatbotContainer';
import { domainConfig } from '@/config/domain.config';
import { IntlProvider } from 'react-intl';
import ru from '../../lang/ru.json';

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
  const messages = ru as typeof ru;
  return (
    <>
      <IntlProvider locale={'ru'} messages={messages}>
        {chatbot && <ChatbotContainer chatbot={chatbot} isIframe={true} />}
      </IntlProvider>
    </>
  );
};
//eslint-disable-next-line
// @ts-ignore
export async function getServerSideProps(context) {
  const response = await fetch(
    `${domainConfig.BACKEND_DOMAIN_NAME}/v1/settings/allowed-domains?chatbot_id=${context.params.chatbot_id}`,
  );
  const allowedDomains: string[] = await response.json();
  if (Array.isArray(allowedDomains) && allowedDomains.length > 0) {
    process.env.NODE_ENV !== 'production'
      ? context.res.setHeader(
          'Content-Security-Policy',
          `frame-ancestors 'self' ${allowedDomains.join(' ')}`,
        )
      : context.res.setHeader(
          'Content-Security-Policy',
          `frame-ancestors ${allowedDomains.join(' ')}`,
        );
  }

  return { props: { noLayout: true } };
}
export default ChatbotIframe;
