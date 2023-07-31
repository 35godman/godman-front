import React from 'react';
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
        <div className="flex justify-end max-w-full my-5">
          <div
            style={{ backgroundColor: user_color }}
            className=" prose text-inherit text-right break-words dark:prose-invert transition duration-300 ease-in-out rounded-lg rounded-r-sm bg-gray-800 text-white p-4 max-w-4/5 "
          >
            <p>{textProp}</p>
          </div>
        </div>
      )}
      {chat_role === 'assistant' && (
        <div className="flex justify-start max-w-[80%]">
          <div
            className="whitespace-pre-wrap prose text-inherit text-left break-words dark:prose-invert transition duration-300 ease-in-out rounded-lg rounded-r-sm bg-gray-800 text-white p-4 max-w-4/5"
            style={{ backgroundColor: 'rgb(30, 35, 48)' }}
          >
            <p>{textProp}</p>
          </div>
        </div>
      )}
    </>
  );
};
