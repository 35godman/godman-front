import React, { FC, useEffect, useRef, useState } from 'react';
import { Input, Button } from 'antd';
import s from './InputAskAI.module.css';
import cn from 'classnames';
import { AnswerComp } from './AnswerComp';
import { AskComp } from './AskComp';
import { useChatbot } from '@/features/Chatbot/model/useChatbot';
import { Chatbot } from '@/types/models/globals';
import { ChatMessage } from '@/entities/ChatMessage/ChatMessage';
import { Loader } from '@/features/Chatbot/ui/Loader';

type InputAskAIProps = {
  chatbot: Chatbot;
};

export const InputAskAI: FC<InputAskAIProps> = ({ chatbot }) => {
  const [inputValue, setInputValue] = useState('');
  const [showChat, setShowChat] = useState(true);
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
  //   setShowChat(questionValue.length > 0);
  // }, [questionValue]);

  return (
    <div className={showChat ? cn(s.chat, s.open) : s.chat}>
      {showChat && (
        <div className={s.messagesWrapper}>
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
          {currentAnswer ? (
            <div>
              <AnswerComp text={currentAnswer} />
            </div>
          ) : (
            isBotAnswering && (
              <Loader
                color_bubble={'#fff'}
                color_container={chatbot.settings.bot_message_color}
              />
            )
          )}
          {/*<AnswerComp text="What is the Godman.AI?" />*/}
          {/*<AskComp text="Godman.AI is a n IDE (Integrated Development Enviroment) that is designed for constructing your own chatbot in collaboration with a powerfull AI " />*/}
          {/*<AnswerComp text="What is the Godman.AI?" />*/}
          {/*<AskComp text="Godman.AI is a n IDE (Integrated Development Enviroment) that is designed for constructing your own chatbot in collaboration with a powerfull AI " />*/}
        </div>
      )}
      <div className={s.wrapper}>
        <Input
          className={s.input}
          placeholder="Ask the AI about Godman"
          value={questionValue}
          onChange={(e) => setQuestionValue(e.target.value)}
        />
        <Button
          className={s.btn}
          onClick={() => sendMessage(questionValue)}
          loading={buttonLoading}
        >
          Enter
        </Button>
      </div>
    </div>
  );
};
