import React, { FC, useState } from 'react';
import { Collapse, CollapseProps, Spin } from 'antd';
import globalService from '@/service/globalService';
import { Chatbot } from '@/types/models/globals';
import { ChatBot } from '@/components/ChatBot/ChatBot';
import { FormattedMessage } from 'react-intl';

type ChatbotContainerProps = {
  chatbot: Chatbot;
  isIframe?: boolean;
};

const ChatbotContainer: FC<ChatbotContainerProps> = ({ chatbot, isIframe }) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false);
  const [vectorsUsed, setVectorsUsed] = useState<string>('');
  const [isViewSourceAvailable, setIsViewSourceAvailable] =
    useState<boolean>(false);

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: <FormattedMessage id={'chatbot.show-source'} />,
      children: (
        <>{vectorsUsed ? <p>{vectorsUsed}</p> : <Spin size={'small'} />}</>
      ),
    },
  ];
  const showMessageSource = async () => {
    if (!isCollapseOpen) {
      setVectorsUsed('');
      const conversationId = localStorage.getItem('conversationId');
      const conversationSource = await globalService.get(
        `/conversation/show-latest-source?chatbot_id=${chatbot._id}&conversation_id=${conversationId}`,
      );
      setVectorsUsed(conversationSource.data.source);
    }
    setIsCollapseOpen((prevState) => !prevState);
  };
  return (
    <>
      {isIframe ? (
        <div
          className="m-auto min-h-screen  flex flex-col  rounded h-[80vh] overflow-auto justify-between border-zinc-200 border "
          style={{ backgroundColor: chatbot.settings.footer_color }}
        >
          <ChatBot chatbot={chatbot} />
        </div>
      ) : (
        <>
          <div
            style={{ backgroundColor: chatbot.settings.footer_color }}
            className="m-auto min-h-[100%] max-w-[60%] flex flex-col  rounded h-[42rem] bg-white overflow-auto justify-between border-zinc-200 border  "
          >
            <ChatBot
              chatbot={chatbot}
              setCollapseOpen={setIsViewSourceAvailable}
            />
          </div>
          <div>
            {isViewSourceAvailable && (
              <Collapse items={collapseItems} onChange={showMessageSource} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ChatbotContainer;
