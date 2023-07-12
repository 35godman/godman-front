import React from 'react';
import s from './ChatMessage.module.css';

type ChatMessageProps = {
  text: string;
  color: string;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ text, color }) => {
  return (
    <div style={{ backgroundColor: color }} className={s.ChatMessage}>
      {text}
    </div>
  );
};
