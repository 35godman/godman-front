import React, { FC } from 'react';
import Image from 'next/image';
import { Typography } from 'antd';
import { Chatbot } from '@/types/models/globals';

export type ChatbotHeaderProps = {
  chatbot: Chatbot;
};

const ChatbotHeader: FC<ChatbotHeaderProps> = ({ chatbot }) => {
  return (
    <div
      className="sticky top-0 w-[88%] z-10 m-auto py-8"
      style={{ backgroundColor: chatbot.settings.footer_color }}
    >
      <div className="flex justify-between  m-auto mb-0  items-center z-10">
        <div className="flex items-center">
          <Image
            className="rounded-full m-1 mr-2 w-10 h-10"
            src={chatbot.settings.profile_picture_path}
            alt={'Image profile'}
            width={100}
            height={100}
          />
          <Typography className={'text-[17.3px] font-extrabold'}>
            {chatbot.settings.display_name}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ChatbotHeader;
