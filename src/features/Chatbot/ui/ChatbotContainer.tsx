import React, { FC, useState } from 'react';
import { Collapse, CollapseProps, Spin } from 'antd';
import globalService from '@/shared/service/globalService';
import { Chatbot } from '@/types/models/globals';
import { ChatBot } from '@/features/Chatbot/ui/Chatbot/ChatBot';
import { FormattedMessage } from 'react-intl';
import { getConversationSource } from '@/features/Chatbot/api';
import { VectorsCollapse } from '@/features/Chatbot/ui/VectorsCollapse';
import { useChatbotContainer } from '@/features/Chatbot/model/useChatbotContainer';

type ChatbotContainerProps = {
  chatbot: Chatbot;
  isIframe?: boolean;
};

const ChatbotContainer: FC<ChatbotContainerProps> = ({ chatbot, isIframe }) => {
  const {
    vectorsUsed,
    isViewSourceAvailable,
    showMessageSource,
    setIsViewSourceAvailable,
  } = useChatbotContainer(chatbot._id);

  return (
    <>
      {isIframe ? (
        <div
          className="m-auto min-h-screen  flex flex-col  rounded h-[80vh] overflow-auto border-zinc-200 border "
          style={{ backgroundColor: chatbot.settings.footer_color }}
        >
          <ChatBot chatbot={chatbot} />
        </div>
      ) : (
        <>
          <div
            style={{ backgroundColor: chatbot.settings.footer_color }}
            className="m-auto min-h-[100%] max-w-[60%] flex flex-col  rounded h-[42rem] bg-white overflow-auto border-zinc-200 border  "
          >
            <ChatBot
              chatbot={chatbot}
              setCollapseOpen={setIsViewSourceAvailable}
            />
          </div>
          <VectorsCollapse
            vectorsUsed={vectorsUsed}
            showMessageSource={showMessageSource}
            isViewSourceAvailable={isViewSourceAvailable}
          />
        </>
      )}
    </>
  );
};

export default ChatbotContainer;
