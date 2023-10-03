import React, {
  FC,
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useRef,
} from 'react';
import { Chatbot } from '@/types/models/globals';
import { ChatMessage } from '@/entities/ChatMessage/ChatMessage';
import { MessageState } from '@/types/models/chatbotCustom/messageState';
import { Loader } from '@/features/Chatbot/ui/Loader';
import { scrollToBottom } from '@/features/Chatbot/lib/scrollToBottomOfRef';

export type ChatAreaProps = {
  chatbot: Chatbot;
  messages: MessageState[];
  currentAnswer: string;
  isBotAnswering: boolean;
  preview_messages?: string[];
};
const ChatArea: ForwardRefRenderFunction<HTMLDivElement, ChatAreaProps> = (
  { currentAnswer, isBotAnswering, messages, chatbot, preview_messages },
  ref,
) => {
  const userScrolled = useRef(false);
  const messagesBlock = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    userScrolled.current = false;
    const handleScroll = () => {
      userScrolled.current = true;
    };
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.addEventListener('wheel', handleScroll);
    }
  }, [isBotAnswering, ref]);

  const scrollToTheEndOfChat = (
    ref: React.RefObject<HTMLDivElement> | null,
  ) => {
    if (ref && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToTheEndOfChat(messagesBlock);
  }, [messages, currentAnswer]);

  /**
   * @COMMENT FOR PREVIEW
   */
  if (preview_messages?.length) {
    return (
      <div className={'flex flex-col w-[88%] m-auto mt-4'} ref={ref}>
        {preview_messages.map((msg, index) => {
          return (
            <ChatMessage
              settings={chatbot.settings}
              chat_role={'assistant'}
              textProp={msg}
              key={index}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={'flex flex-col w-[88%] m-auto mt-4'} ref={messagesBlock}>
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
        <div>
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
  );
};

export default forwardRef(ChatArea);
