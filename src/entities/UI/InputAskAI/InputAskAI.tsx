import React, { useState } from 'react';
import { Input, Button } from 'antd';
import s from './InputAskAI.module.css';
import cn from 'classnames';
import { AnswerComp } from './AnswerComp';
import { AskComp } from './AskComp';

export const InputAskAI = () => {
  const [inputValue, setInputValue] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    if (e.target.value !== '') {
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  };

  return (
    <div className={showChat ? cn(s.chat, s.open) : s.chat}>
      {showChat && (
        <div className={s.messagesWrapper}>
          <AnswerComp text="What is the Godman.AI?" />
          <AskComp text="Godman.AI is a n IDE (Integrated Development Enviroment) that is designed for constructing your own chatbot in collaboration with a powerfull AI " />
          <AnswerComp text="What is the Godman.AI?" />
          <AskComp text="Godman.AI is a n IDE (Integrated Development Enviroment) that is designed for constructing your own chatbot in collaboration with a powerfull AI " />
        </div>
      )}
      <div className={s.wrapper}>
        <Input
          className={s.input}
          placeholder="Ask the AI about Godman"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button className={s.btn}>Enter</Button>
      </div>
    </div>
  );
};
