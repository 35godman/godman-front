import React, { FC, useEffect, useState } from 'react';
import { Button, Image, Input, Typography } from 'antd';
import { Suggestion } from '@/components/Suggestion/Suggestion';
import { SendOutlined } from '@ant-design/icons';
import { Chatbot } from '@/types/models/globals';
import { ChatMessage } from '@/components/ChatMessage/ChatMessage';
import Link from 'next/link';
import { useIntl } from 'react-intl';

type ChatPreviewProps = {
  chatbot: Chatbot;
};

const ChatPreview: FC<ChatPreviewProps> = ({ chatbot }) => {
  const intl = useIntl();
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
        className="sticky top-0 w-[88%] z-10 m-auto py-[5%]"
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
      <div className={'overflow-scroll h-[80%]'}>
        <div className="flex flex-col m-auto w-[88%] border-b border-black pb-4 mb-0 mt-0">
          {suggestMsgArr.map((msg) => {
            return (
              <Suggestion
                textProp={msg}
                key={msg}
                settings={chatbot.settings}
              />
            );
          })}
        </div>
        <div className={'flex flex-col w-[88%] m-auto mt-4'}>
          {initialMsgArr.map((msg, index) => {
            return (
              <ChatMessage
                settings={chatbot.settings}
                chat_role={'assistant'}
                textProp={msg}
                key={index}
              />
            );
          })}
          <ChatMessage
            textProp={'Tell me about this'}
            chat_role={'user'}
            settings={chatbot.settings}
          />
        </div>
      </div>
      <div
        className=" sticky bottom-0 z-10 pt-[38px] pb-[6px]"
        style={{ backgroundColor: chatbot.settings.footer_color }}
      >
        <div>
          <div className="flex pl-3 pr-3 rounded">
            <div className="flex items-center w-full relative">
              <Input.TextArea
                rows={3}
                placeholder="Ask me anything..."
                className="m-0 w-full min-h-[4.5rem] max-h-36 pr-16 rounded-lg big-placeholder hover:border-white focus:border-0 focus:border-white"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 ">
                <Button
                  className={`w-auto border-0 bg-white disabled:bg-white`}
                >
                  <SendOutlined
                    style={{ fontSize: '25px', background: 'transparent' }}
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center space-x-1 mt-2">
            <p>{intl.formatMessage({ id: 'chatbot.powered-by' })}</p>
            <Link
              href={'https://cheerful-plans-273208.framer.app'}
              className={' hover:text-black active:text-black underline'}
              target="_blank"
            >
              Godman
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPreview;
