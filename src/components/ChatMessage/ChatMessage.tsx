import React from 'react';
type ChatMessageProps = {
  textProp: string;
  chat_role: 'user' | 'assistant' | 'system';
  msg_color?: string;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  textProp,
  chat_role,
  msg_color,
}) => {
  return (
    <>
      {chat_role === 'user' && (
        <div className="flex justify-end max-w-full my-5">
          <div
            style={{ backgroundColor: msg_color }}
            className=" prose text-inherit text-right break-words dark:prose-invert transition duration-300 ease-in-out rounded-lg rounded-r-sm bg-gray-800 text-white p-4 max-w-4/5 rounded-tl-[15px] rounded-tr-[15px] rounded-bl-[15px] rounded-br-none"
          >
            <p className={'font-[Montserrat] text-lg'}>{textProp}</p>
          </div>
        </div>
      )}
      {chat_role === 'assistant' && (
        <div className="flex justify-start max-w-[80%] mb-4">
          <div
            className="whitespace-pre-wrap prose text-inherit text-left break-words dark:prose-invert transition duration-300 ease-in-out rounded-lg rounded-r-sm bg-gray-800 text-white p-4 max-w-4/5 rounded-tl-[15px] rounded-tr-[15px] rounded-bl-none rounded-br-[15px]"
            style={{ backgroundColor: msg_color }}
          >
            <p className={'font-[Montserrat] text-lg'}>{textProp}</p>
          </div>
        </div>
      )}
    </>
  );
};
