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
        className="sticky top-0 w-full border-b border-black rounded-tr-2xl rounded-tl-2xl"
        style={{ backgroundColor: chatbot.settings.footer_color }}
      >
        <div className="flex justify-between mb-0 pt-[2em]  z-10 m-auto w-[80%]">
          <div className="flex items-center">
            <Image
              className="rounded-full m-1 mr-2 w-10 h-10"
              src={chatbot.settings.profile_picture_path}
              alt={'Image profile'}
              width={100}
              height={100}
            />
            <Typography className={'text-xl font-bold'}>
              {chatbot.settings.display_name}
            </Typography>
          </div>
        </div>
        <div className="py-3 flex flex-col overflow-x-auto m-auto w-[80%] ">
          {suggestMsgArr.map((msg) => {
            return <Suggestion textProp={msg} key={msg} />;
          })}
        </div>
      </div>
      <div className={'flex flex-col min-h-[400px]  w-[90%] m-auto'}>
        {initialMsgArr.map((msg, index) => {
          return (
            <ChatMessage
              chat_role={'assistant'}
              textProp={msg}
              key={index}
              msg_color={chatbot.settings.bot_message_color}
            />
          );
        })}
        <ChatMessage
          textProp={'What can your chatbot do?'}
          chat_role={'user'}
          key={'user_msg'}
          msg_color={chatbot.settings.user_message_color}
        />
        <ChatMessage
          textProp={"I'm an AI Assistant"}
          chat_role={'assistant'}
          key={'assistant_msg'}
          msg_color={chatbot.settings.bot_message_color}
        />
      </div>
      <div
        className=" sticky bottom-0"
        style={{ backgroundColor: chatbot.settings.footer_color }}
      >
        <div>
          <div className="flex pl-3 p-1 rounded">
            <div className="flex items-center w-full relative">
              <Button
                className={`flex-none border-0 bg-transparent`}
                icon={<ReloadOutlined style={{ fontSize: '26px' }} />}
              ></Button>
              <Input
                placeholder="Ask me anything..."
                style={{ fontSize: '1rem' }}
                aria-label="chat input"
                className="m-0 w-full min-h-[3.5rem] max-h-36 pr-7 rounded-lg "
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Button
                  className={`flex-none border-0 bg-opacity-50 bg-transparent`}
                  icon={<SendOutlined style={{ fontSize: '26px' }} />}
                ></Button>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col items-center">
            <Title level={5} className={'font-[Montserrat]'}>
              Powered by: <a href="https://godman.tech/">Godman</a>
            </Title>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPreview;
