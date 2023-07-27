import React from 'react';
import s from './ChatMessage.module.css';

type InitialChatMessageProps = {
  textProp: string;
};

export const InitialChatMessage: React.FC<InitialChatMessageProps> = ({
  textProp,
}) => {
  return (
    <div className="flex justify-start mr-8">
      <div className=" overflow-auto max-w-prose mb-3 rounded-lg py-3 px-4">
        <div className="flex flex-col items-start gap-4 break-words">
          <div className="prose text-inherit text-left w-full break-words dark:prose-invert ">
            <p>{textProp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
