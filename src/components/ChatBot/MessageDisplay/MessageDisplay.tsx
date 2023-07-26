import React, { FC } from 'react';
import { Chatbot } from '@/types/models/globals';
import s from './MessageDisplay.module.css';
type MessageDisplayProps = {
  role: 'user' | 'assistant' | 'system';
  text: string;
  chatbot: Chatbot;
};
const MessageDisplay: FC<MessageDisplayProps> = ({ role, text, chatbot }) => {
  return (
    <>
      {role === 'assistant' ? (
        <div className={s.mainMsg}>
          {role} /{text}
        </div>
      ) : (
        <div
          className={s.mainMsg}
          style={{ backgroundColor: chatbot.settings.user_message_color }}
        >
          {role} /{text}
        </div>
      )}
    </>
  );
};

export default MessageDisplay;
