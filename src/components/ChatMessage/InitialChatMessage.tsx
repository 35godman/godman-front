import React from 'react';
import s from './ChatMessage.module.css';

type ChatMessageProps = {
  textProp: string;
  chat_role: 'user' | 'assistant' | 'system';
  user_color?: string;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  textProp,
  chat_role,
  user_color,
}) => {
  return (
    <>
      {chat_role === 'user' && (
        <div
          className="flex justify-end mr-8 "
          style={{ backgroundColor: user_color }}
        >
          <div className=" overflow-auto max-w-prose mb-3 rounded-lg py-3 px-4">
            <div className="flex flex-col items-end gap-4 break-words">
              <div className="prose text-inherit text-left w-full break-words dark:prose-invert ">
                <p>{textProp}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {chat_role === 'assistant' && (
        <div
          className="flex justify-start mr-8 rounded-full w-44 align-middle text-white m-2.5"
          style={{ backgroundColor: 'rgb(30, 35, 48)' }}
        >
          <div className=" overflow-auto max-w-prose rounded-lg py-3 px-4">
            <div className="flex flex-col items-end gap-4 break-words">
              <div className="prose text-inherit text-left w-full break-words dark:prose-invert ">
                <p>{textProp}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
