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
  } = useChatbot(chatbot, messagesBlock);

  // useEffect(() => {
  //   questionValue.length > 0 && setShowChat(true);
  // }, [questionValue]);

  return (
    <div className={'flex w-full'}>
      <div className={showChat ? cn(s.chat, s.open) : s.chat}>
        {showChat && (
          <div className={s.messagesWrapper}>
            {chatbot.settings.initial_messages.map(msg => {
              return <AnswerComp text={msg} key={msg} />;
            })}
            {messages.map(msg => {
              if (msg.role === 'user') {
                return <AnswerComp text={msg.content} key={msg._id} />;
              } else {
                return <AskComp text={msg.content} key={msg._id} />;
              }
            })}
            {/* {currentAnswer ? ( */}
            <div>
              <AnswerComp text={currentAnswer} />
            </div>
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
            onKeyDown={async e => {
              if (e.key === 'Enter' && questionValue.length > 3) {
                await sendMessage(questionValue);
              }
            }}
            onChange={e => setQuestionValue(e.target.value)}
          />
          <Button
            className={s.btn}
            onClick={() => {
              sendMessage(questionValue);
              setShowChat(true);
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
