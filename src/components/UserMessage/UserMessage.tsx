import React from 'react';

type UserMessageProps = {
  text: string;
  color: string;
};

export const UserMessage: React.FC<UserMessageProps> = ({ text, color }) => {
  return (
    <div className="flex justify-end ml-8" style={{ background: color }}>
      <div className=" overflow-auto max-w-prose mb-3 rounded-lg py-3 px-4">
        <div className="flex flex-col items-start gap-4 break-words dark">
          <div className="prose text-inherit text-left w-full break-words dark:prose-invert ">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
