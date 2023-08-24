import React, { useEffect, useRef, useState } from 'react';
import { Suggestion } from '../../../../components/Suggestion/Suggestion';
import { Button, Input, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Chatbot } from '@/types/models/globals';
import { MessageState } from '@/types/models/chatbotCustom/messageState';
import { nanoid } from 'nanoid';
import { RoleState } from '@/types/models/role';
import { ChatMessage } from '@/entities/ChatMessage/ChatMessage';
import s from './ChatBot.module.css';
import { Loader } from '@/features/Chatbot/ui/Loader/Loader';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import ChatbotHeader from '@/features/Chatbot/ui/ChatbotHeader';
import ChatArea from '@/features/Chatbot/ui/ChatArea';
import { useChatbot } from '@/features/Chatbot/model/useChatbot';
import ChatbotFooter from '@/features/Chatbot/ui/ChatbotFooter';
import SuggestedContainer from '@/features/Chatbot/ui/SuggestedContainer';

type ChatBotProps = {
  chatbot: Chatbot;
  setCollapseOpen?: (isOpen: boolean) => void;
};

export const ChatBot: React.FC<ChatBotProps> = ({
  chatbot,
  setCollapseOpen,
}) => {
  const intl = useIntl();
  const messagesBlock = useRef<HTMLDivElement | null>(null);

  const {
    questionValue,
    setQuestionValue,
    isBotAnswering,
    currentAnswer,
    buttonLoading,
    messages,
    sendMessage,
  } = useChatbot(chatbot, messagesBlock, setCollapseOpen);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('conversationId', nanoid());
    }
  }, []);

  return (
    <>
      <ChatbotHeader chatbot={chatbot} />
      <div className={'overflow-scroll h-[80%]'}>
        <SuggestedContainer
          chatbot={chatbot}
          buttonLoading={buttonLoading}
          sendMessage={sendMessage}
        />
        <ChatArea
          ref={messagesBlock}
          chatbot={chatbot}
          messages={messages}
          currentAnswer={currentAnswer}
          isBotAnswering={isBotAnswering}
        />
      </div>
      <ChatbotFooter
        chatbot={chatbot}
        questionValue={questionValue}
        setQuestionValue={setQuestionValue}
        sendMessage={sendMessage}
        buttonLoading={buttonLoading}
        intl={intl}
      />
    </>
  );
};
