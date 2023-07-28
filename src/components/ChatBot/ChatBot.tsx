import React, { useEffect, useState } from 'react';
import s from './ChatBot.module.css';
import { Suggestion } from '../Suggestion/Suggestion';
import { InitialChatMessage } from '../ChatMessage/ChatMessage';
import { UserMessage } from '../UserMessage/UserMessage';
import { Button, Input, Typography } from 'antd';
import { ReloadOutlined, SendOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Chatbot, User } from '@/types/models/globals';
import ProfilePicture from '@/components/ChatBot/ProfilePicture/ProfilePicture';
import SendMessageButton from '@/components/ChatBot/SendMessageButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import globalService from '@/service/globalService';
import crawlService from '@/service/crawlService';
import { MessageState } from '@/types/models/chatbotCustom/messageState';
import MessageDisplay from '@/components/ChatBot/MessageDisplay/MessageDisplay';
import { domainConfig } from '@/config/domain.config';

type ChatBotProps = {
  chatbot: Chatbot;
};

const { TextArea } = Input;
export const ChatBot: React.FC<ChatBotProps> = ({ chatbot }) => {
  const [questionValue, setQuestionValue] = useState<string>('');
  const user = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<MessageState[]>([]);
  console.log('=>(ChatBot.tsx:27) messages', messages);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number | null>(
    null,
  );

  const sendMessage = async () => {
    const newMessages = [
      ...messages,
      {
        content: questionValue,
        role: 'user',
      },
      { content: '', role: 'assistant' },
    ];
    //setMessages(newMessages)

    setCurrentMessageIndex(9);

    const body = {
      question: questionValue,
      user_id: user._id,
      chatbot_id: chatbot._id,
    };
    const response = await fetch(
      `${domainConfig.BACKEND_DOMAIN_NAME}/v1/embedding/ask`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    let answer = '';
    if (response.body) {
      const reader = response.body.getReader();
      console.log(currentMessageIndex);
      console.log(messages.length);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const text = new TextDecoder().decode(value);
        answer += text;
        // const newState = [...messages];
        // console.log('=>(ChatBot.tsx:82) newState', newState);
        // /**
        //  * о
        //  */
        // if (newState.length > 0) {
        //   newState[newState.length - 1].content += text;
      }
    }
    const newState = [...messages];
    console.log('=>(ChatBot.tsx:82) newState', newState);
  };

  return (
    <>
      <div className="min-h-screen px-4 flex flex-col  rounded h-[42rem] bg-white overflow-auto justify-between border-zinc-200 border pt-2 ">
        <div className=" sticky top-0 w-full">
          <div className="flex justify-between py-1 mb-4   z-10">
            <div className="flex items-center">
              <Image
                className="rounded-full m-1 mr-2 w-7 h-7"
                src={chatbot.settings.profile_picture_path}
                alt={'Image profile'}
                width={100}
                height={100}
              />
              <Typography>{chatbot.settings.display_name}</Typography>
            </div>
          </div>
        </div>
        <div className="flex-grow ">Messages...</div>
        <div className=" sticky bottom-0 bg-inherit">
          <div>
            <div className="py-3 flex overflow-x-auto">
              {chatbot.settings.suggested_messages.map((msg) => {
                return <Suggestion textProp={msg} key={msg} />;
              })}
            </div>
            <div
              className="flex pl-3 p-1 rounded mb-8"
              style={{ background: 'white', border: '1px solid #e4e4e7' }}
            >
              <div className="flex items-center w-full ">
                <TextArea
                  aria-label="chat input"
                  className=" m-0 w-full min-h-[1.5rem] max-h-36 pr-7 resize-none border-0 bg-inherit flex-1 appearance-none rounded-md focus:ring-0 focus-visible:ring-0 focus:outline-none "
                ></TextArea>
              </div>
              <div className="flex items-end">
                <Button
                  className=" flex-none p-2"
                  onClick={sendMessage}
                  icon={<SendOutlined />}
                ></Button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};
