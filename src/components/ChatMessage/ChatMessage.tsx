import React from 'react';
import s from './ChatMessage.module.css';

type InitialChatMessageProps = {
  textProp: string;
};

export const InitialChatMessage: React.FC<InitialChatMessageProps> = ({
  textProp,
}) => {
  return <div className={s.ChatMessage}>{textProp}</div>;
};
