import React from 'react';
import s from './ChatMessage.module.css';

type ChatMessageProps = {
  textProp: string;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ textProp }) => {
  return <div className={s.ChatMessage}>{textProp}</div>;
};
