import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Image, Input, Typography } from 'antd';
import { Suggestion } from '@/entities/Suggestion/Suggestion';
import { SendOutlined } from '@ant-design/icons';
import { Chatbot } from '@/types/models/globals';
import { ChatMessage } from '@/entities/ChatMessage/ChatMessage';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import ChatbotHeader from '@/features/Chatbot/ui/ChatbotHeader';
import ChatbotFooter from '@/features/Chatbot/ui/ChatbotFooter';
import SuggestedContainer from '@/features/Chatbot/ui/SuggestedContainer';
import ChatArea from '@/features/Chatbot/ui/ChatArea';
import { RoleState } from '@/types/models/role';
import { nanoid } from 'nanoid';
import { MessageState } from '@/types/models/chatbotCustom/messageState';
import { usePreviewMessages } from '@/features/ChatPreview/model/usePreviewMessages';

type ChatPreviewProps = {
  chatbot: Chatbot;
};

const ChatPreview: FC<ChatPreviewProps> = ({ chatbot }) => {
  const intl = useIntl();
  const previewRef = useRef(null);
  const { suggestMsgArr, initialMsgArr } = usePreviewMessages(chatbot);
  return (
    <>
      <ChatbotHeader chatbot={chatbot} />
      <div className={'overflow-scroll h-[80%]'}>
        <SuggestedContainer
          preview_messages={suggestMsgArr}
          chatbot={chatbot}
          buttonLoading={false}
          sendMessage={() => Promise.resolve()}
        />
        <ChatArea
          preview_messages={initialMsgArr}
          ref={previewRef}
          chatbot={chatbot}
          messages={[]}
          currentAnswer={''}
          isBotAnswering={false}
        />
      </div>
      <ChatbotFooter
        chatbot={chatbot}
        questionValue={'Вопрос пользователя'}
        setQuestionValue={() => null}
        sendMessage={() => Promise.resolve()}
        buttonLoading={false}
        intl={intl}
      />
    </>
  );
};

export default ChatPreview;
