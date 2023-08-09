import React, { FC, useEffect, useState } from 'react';
import s from '@/components/Settings/Settings.module.css';
import sPrev from './ChatPreview.module.css';
import { Button, Image, Input, Typography } from 'antd';
import { Suggestion } from '@/components/Suggestion/Suggestion';
import { ReloadOutlined, SendOutlined } from '@ant-design/icons';
import { Chatbot } from '@/types/models/globals';
import { ChatMessage } from '@/components/ChatMessage/ChatMessage';
import { Loader } from '@/components/ChatBot/Loader/Loader';
const { Paragraph, Title } = Typography;

type ChatPreviewProps = {
  chatbot: Chatbot;
};

const ChatPreview: FC<ChatPreviewProps> = ({ chatbot }) => {
  const [suggestMsgArr, setSuggestMsgArr] = useState<string[]>([]);
  const [initialMsgArr, setInitialMsgArr] = useState<string[]>([]);
  useEffect(() => {
    if (chatbot.settings.new_suggested_messages) {
      const arr = chatbot.settings.new_suggested_messages.split('\n');
      setSuggestMsgArr(arr);
    }
    if (chatbot.settings.new_initial_messages) {
      const arr = chatbot.settings.new_initial_messages.split('\n');
      setInitialMsgArr(arr);
    }
  }, [chatbot]);

  return (
    <>
      <div
        className="sticky top-0 w-full z-10"
        style={{ backgroundColor: chatbot.settings.footer_color }}
      >
        <div className="flex justify-between  m-auto mb-0 w-full items-center pt-2 z-10 ">
          <div className="flex items-center">
            <Image
              className="rounded-full m-1 mr-2 w-10 h-10"
              src={chatbot.settings.profile_picture_path}
              alt={'Image profile'}
              width={100}
              height={100}
            />
            <Typography className={' font-semibold text-[17.3px]'}>
              {chatbot.settings.display_name}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex flex-col m-auto w-[88%] mt-2 border-b border-black pb-2 mb-0">
        {suggestMsgArr.map((msg) => {
          return (
            <Suggestion textProp={msg} key={msg} settings={chatbot.settings} />
          );
        })}
      </div>
      <div className={'flex flex-col w-[90%] m-auto mt-5'}>
        {initialMsgArr.map((msg, index) => {
          return (
            <ChatMessage
              chat_role={'assistant'}
              textProp={msg}
              settings={chatbot.settings}
              key={index}
            />
          );
        })}
      </div>
      <div
        className=" sticky bottom-0"
        // style={{ backgroundColor: chatbot.settings.footer_color }}
      >
        <div>
          <div className="flex pl-3 p-1 rounded">
            <div className="flex items-center w-full relative">
              <Input
                value={''}
                placeholder="Ask me anything..."
                style={{ fontSize: '1rem' }}
                className="m-0 w-full min-h-[4.5rem] max-h-36 pr-7 rounded-lg big-placeholder"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Button
                  className={`flex-none border-0 bg-white disabled:bg-white`}
                  icon={
                    <SendOutlined
                      style={{ fontSize: '26px', background: 'transparent' }}
                    />
                  }
                ></Button>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center items-center space-x-1">
            <p style={{ color: chatbot.settings.bot_font_color }}>Powered by</p>
            <a
              style={{ color: chatbot.settings.bot_font_color }}
              href="https://godman.tech/"
              className={' hover:text-black active:text-black underline'}
            >
              Godman
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPreview;
