import React, { FC } from 'react';
import s from '@/features/Chatbot/ui/Chatbot/ChatBot.module.css';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Chatbot } from '@/types/models/globals';
import { IntlShape, useIntl } from 'react-intl';

export type ChatbotFooterProps = {
  chatbot: Chatbot;
  questionValue: string;
  setQuestionValue: (question: string) => void;
  sendMessage: (msg: string) => Promise<void>;
  buttonLoading: boolean;
  intl: IntlShape;
};

const ChatbotFooter: FC<ChatbotFooterProps> = ({
  chatbot,
  questionValue,
  setQuestionValue,
  buttonLoading,
  sendMessage,
  intl,
}) => {
  return (
    <div
      className=" sticky bottom-0 z-10 pt-[38px] pb-[6px]"
      style={{ backgroundColor: chatbot.settings.footer_color }}
    >
      <div>
        <div className="flex pl-3 pr-3 rounded">
          <div className="flex items-center w-full relative">
            {/*<Button*/}
            {/*  loading={buttonLoading}*/}
            {/*  className={`flex-none border-0 ${*/}
            {/*    !questionValue.length*/}
            {/*      ? 'bg-opacity-50 bg-transparent'*/}
            {/*      : 'bg-transparent'*/}
            {/*  }`}*/}
            {/*  onClick={() => reloadConversation()}*/}
            {/*  icon={<ReloadOutlined style={{ fontSize: '26px' }} />}*/}
            {/*  disabled={!messages.length}*/}
            {/*></Button>*/}
            <div className={`${s.textAreaContainer} bg-white`}>
              <Input.TextArea
                autoSize={true}
                rows={4}
                value={questionValue}
                onChange={(e) => setQuestionValue(e.target.value)}
                placeholder="Ask me anything..."
                onKeyDown={async (e) => {
                  if (e.key === 'Enter' && questionValue.length > 3) {
                    await sendMessage(questionValue);
                  }
                }}
                className={`m-0 w-full
                 max-h-36 pr-16 
                  rounded-lg hover:border-white
                  border-none
                  focus:border-0 focus:border-none focus:shadow-none`}
              />
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 ">
              <Button
                loading={buttonLoading}
                className={`w-auto border-0 bg-white disabled:bg-white`}
                onClick={() => sendMessage(questionValue)}
                disabled={!questionValue.length}
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
  );
};

export default ChatbotFooter;
