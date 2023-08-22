import React, {
  FC,
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useRef,
} from 'react';
import { Chatbot } from '@/types/models/globals';
import { ChatMessage } from '@/components/ChatMessage/ChatMessage';
import { MessageState } from '@/types/models/chatbotCustom/messageState';
import { Loader } from '@/features/Chatbot/ui/Loader';
import { scrollToBottom } from '@/features/Chatbot/lib/scrollToBottomOfRef';

export type ChatAreaProps = {
  chatbot: Chatbot;
  messages: MessageState[];
  currentAnswer: string;
  isBotAnswering: boolean;
};

const ChatArea: ForwardRefRenderFunction<HTMLDivElement, ChatAreaProps> = (
  { currentAnswer, isBotAnswering, messages, chatbot },
  ref,
) => {
  const endOfBlock = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let userScrolled = false;
    const handleScroll = () => {
      userScrolled = true;
    };
    endOfBlock?.current?.addEventListener('wheel', handleScroll);
    if (!isBotAnswering) {
      endOfBlock?.current?.removeEventListener('wheel', handleScroll);
    }

    if (endOfBlock?.current && !userScrolled) {
      scrollToBottom(endOfBlock);
    }
  }, [currentAnswer, isBotAnswering]);
  return (
    <div className={'overflow-scroll h-[80%]'}>
      <div className={'flex flex-col w-[88%] m-auto mt-4'} ref={ref}>
        {chatbot.settings.initial_messages.map((msg, index) => {
          return (
            <ChatMessage
              settings={chatbot.settings}
              chat_role={'assistant'}
              textProp={msg}
              key={index}
            />
          );
        })}
        {messages.map((msg) => {
          return (
            <ChatMessage
              textProp={msg.content}
              chat_role={msg.role}
              key={msg._id}
              settings={chatbot.settings}
            />
          );
        })}
        {/**
         * @COMMENT
         * here we are creating a current answer so the render works correctly,
         * there was a problem with updating an array of objects,
         * so we moved it to just string state
         */}
        {currentAnswer ? (
          <div ref={endOfBlock}>
            <ChatMessage
              textProp={currentAnswer}
              chat_role={'assistant'}
              settings={chatbot.settings}
            />
          </div>
        ) : (
          isBotAnswering && (
            <Loader
              color_bubble={'#fff'}
              color_container={chatbot.settings.bot_message_color}
            />
          )
        )}
      </div>
    </div>
  );
};

export default forwardRef(ChatArea);
