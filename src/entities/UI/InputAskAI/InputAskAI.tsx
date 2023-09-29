import React, { FC, useEffect, useRef, useState } from 'react';
import { Input, Button } from 'antd';
import s from './InputAskAI.module.css';
import cn from 'classnames';
import { AnswerComp } from './AnswerComp';
import { AskComp } from './AskComp';
import { useChatbot } from '@/features/Chatbot/model/useChatbot';
import { Chatbot } from '@/types/models/globals';
import { Loader } from '@/features/Chatbot/ui/Loader';
import CloseChatIcon from '../../../../public/svg/closeChat.svg';
type InputAskAIProps = {
  chatbot: Chatbot;
};

export const InputAskAI: FC<InputAskAIProps> = ({ chatbot }) => {
  const [showChat, setShowChat] = useState(false);
  const messagesBlock = useRef<HTMLDivElement | null>(null);
  const {
    questionValue,
    setQuestionValue,
    isBotAnswering,
    currentAnswer,
    buttonLoading,
    messages,
    sendMessage,
  } = useChatbot(chatbot, null);

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

  return (
    <div className={`flex w-full ${s.generalWrapper}`}>
      <div className={showChat ? cn(s.chat, s.open) : s.chat}>
        {showChat && (
          <div className={s.messagesWrapper} ref={messagesBlock}>
            {chatbot.settings.initial_messages.map((msg) => {
              return <AnswerComp text={msg} key={msg} />;
            })}
            {messages.map((msg) => {
              if (msg.role === 'user') {
                return <AnswerComp text={msg.content} key={msg._id} />;
              } else {
                return <AskComp text={msg.content} key={msg._id} />;
              }
            })}
            <div>{currentAnswer && <AnswerComp text={currentAnswer} />}</div>
            {/* ) : (
              isBotAnswering && (
                <Loader
                  color_bubble={'#fff'}
                  color_container={chatbot.settings.bot_message_color}
                />
              )
            )} */}
          </div>
        )}
        <div className={s.wrapper}>
          <Input
            className={s.input}
            placeholder="Ask the AI about Godman"
            value={questionValue}
            onKeyDown={async (e) => {
              if (e.key === 'Enter' && questionValue.length > 3) {
                scrollToTheEndOfChat(messagesBlock);
                await sendMessage(questionValue);
                setShowChat(true);
              }
            }}
            onChange={(e) => setQuestionValue(e.target.value)}
          />
          <Button
            className={s.btn}
            onClick={async () => {
              scrollToTheEndOfChat(messagesBlock);
              setShowChat(true);
              await sendMessage(questionValue);
            }}
            loading={buttonLoading}
          >
            Enter
          </Button>
        </div>
      </div>
      {showChat && (
        <div onClick={() => setShowChat(false)} className={s.closeIcon}>
          <CloseChatIcon />
        </div>
      )}
    </div>
  );
};
