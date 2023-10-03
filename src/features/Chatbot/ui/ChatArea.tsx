import React, {
  FC,
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { Chatbot } from '@/types/models/globals';
import { ChatMessage } from '@/entities/ChatMessage/ChatMessage';
import { MessageState } from '@/types/models/chatbotCustom/messageState';
import { Loader } from '@/features/Chatbot/ui/Loader';
import { scrollToBottom } from '@/features/Chatbot/lib/scrollToBottomOfRef';
import { animateScroll } from 'react-scroll';

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
  const messagesBlock = useRef<HTMLDivElement | null>(null);
  const userHasScrolled = useRef(false);

  const scrollToTheEndOfChat = () => {
    if (!userHasScrolled.current && messagesBlock.current) {
      messagesBlock.current.scrollTop = messagesBlock.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (messagesBlock.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesBlock.current;
      // Check if the user has scrolled away from the bottom
      userHasScrolled.current = scrollTop < scrollHeight - clientHeight;
    }
  };

  useEffect(() => {
    const messageBlockCurrent = messagesBlock.current;
    if (messageBlockCurrent) {
      messageBlockCurrent.addEventListener('scroll', handleScroll);
    }
    // Clean up event listener
    return () => {
      if (messageBlockCurrent) {
        messageBlockCurrent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [messagesBlock.current]);

  useEffect(() => {
    userHasScrolled.current = false; // Reset the scroll flag when messages update
    scrollToTheEndOfChat(); // Immediately scroll to the end
  }, [messages]);

  useEffect(() => {
    scrollToTheEndOfChat();
  }, [currentAnswer, isBotAnswering]);
  /**
   * @COMMENT FOR PREVIEW
   */
  if (preview_messages?.length) {
    return (
      <div className={'flex flex-col w-[88%] m-auto mt-4 '} ref={ref}>
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
    <div
      className={
        'flex flex-col w-[88%] m-auto mt-4 overflow-y-auto max-h-[500px]   scroll-smooth '
      }
      ref={messagesBlock}
      id="myMessageContainer"
    >
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
