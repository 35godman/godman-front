import React from 'react';
import s from './UserMessage.module.css';

type UserMessageProps = {
  text: string;
  color: string;
};

export const UserMessage: React.FC<UserMessageProps> = ({ text, color }) => {
  return (
    <div style={{ backgroundColor: color }} className={s.ChatMessage}>
      {text}
    </div>
  );
};
