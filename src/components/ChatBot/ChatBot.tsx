import React, { useEffect, useState } from 'react';
import { Suggestion } from '../Suggestion/Suggestion';
import { Button, Input, message, Spin, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Chatbot } from '@/types/models/globals';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import { MessageState } from '@/types/models/chatbotCustom/messageState';
import { domainConfig } from '@/config/domain.config';
import { nanoid } from 'nanoid';
import { RoleState } from '@/types/models/role';
import { ChatMessage } from '@/components/ChatMessage/ChatMessage';
import { useRouter } from 'next/router';

type ChatBotProps = {
  chatbot: Chatbot;
};

const { TextArea } = Input;
export const ChatBot: React.FC<ChatBotProps> = ({ chatbot }) => {
  const router = useRouter();
  const [questionValue, setQuestionValue] = useState<string>('');
  const user = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isBotAnswering, setIsBotAnswering] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const sendMessage = async (question: string) => {
    setQuestionValue('');
    setIsBotAnswering(true);
    setButtonLoading(true);
    const newMessages = [
      ...messages,
      {
        _id: nanoid(),
        content: question,
        role: 'user' as RoleState,
      },
    ];
    setMessages(newMessages);

    const body = {
      question: question,
      user_id: user._id,
      chatbot_id: chatbot._id,
    };
    try {
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
      if (response.body) {
        const reader = response.body.getReader();
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const text = new TextDecoder().decode(value);
          setCurrentAnswer((prevState) => prevState + text);
        }
        setIsBotAnswering(false);
        setButtonLoading(false);
      }
    } catch (e) {
      message.error('Произошла ошибка', 2000, () => router.reload());
      setButtonLoading(false);
    }
  };
  useEffect(() => {
    if (!isBotAnswering && currentAnswer) {
      setMessages((prevState) => {
        return [
          ...prevState,
          {
            _id: nanoid(),
            content: currentAnswer,
            role: 'assistant' as RoleState,
          },
        ];
      });
      setCurrentAnswer('');
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBotAnswering]);
  return (
    <>
      <div className="min-h-[80%] max-w-[100%] px-4 flex flex-col  rounded h-[42rem] bg-white overflow-auto justify-between border-zinc-200 border pt-2 ">
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
        <div className={'flex flex-col'}>
          {chatbot.settings.initial_messages.map((msg, index) => {
            return (
              <ChatMessage chat_role={'assistant'} textProp={msg} key={index} />
            );
          })}
          {messages.map((msg) => {
            return (
              <ChatMessage
                textProp={msg.content}
                chat_role={msg.role}
                key={msg._id}
                user_color={chatbot.settings.user_message_color}
              />
            );
          })}
          {/**
           * @COMMENT
           * here we are creating a current answer so the render works correctly,
           * there was a problem with updating an array of objects,
           * so we moved it to just string state
           */}
          {currentAnswer ? (
            <ChatMessage textProp={currentAnswer} chat_role={'assistant'} />
          ) : (
            isBotAnswering && <Spin />
          )}
        </div>
        <div className=" sticky bottom-0 bg-inherit">
          <div>
            <div className="py-3 flex overflow-x-auto">
              {chatbot.settings.suggested_messages.map((msg) => {
                return (
                  <Suggestion
                    textProp={msg}
                    key={msg}
                    onclick={() => sendMessage(msg)}
                  />
                );
              })}
            </div>
            <div
              className="flex pl-3 p-1 rounded mb-8"
              style={{ background: 'white', border: '1px solid #e4e4e7' }}
            >
              <div className="flex items-center w-full ">
                <TextArea
                  onChange={(e) => setQuestionValue(e.target.value)}
                  aria-label="chat input"
                  className=" m-0 w-full min-h-[1.5rem] max-h-36 pr-7 resize-none border-0 bg-inherit flex-1 appearance-none rounded-md focus:ring-0 focus-visible:ring-0 focus:outline-none "
                ></TextArea>
              </div>
              <div className="flex items-center">
                <Button
                  loading={buttonLoading}
                  className=" flex-none"
                  onClick={() => sendMessage(questionValue)}
                  icon={<SendOutlined />}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
