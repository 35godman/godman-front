import React, { useEffect, useRef, useState } from 'react';
import { Suggestion } from '../Suggestion/Suggestion';
import {
  Button,
  Collapse,
  CollapseProps,
  Input,
  message,
  Spin,
  Typography,
} from 'antd';
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
import { headers } from 'next/headers';
import globalService from '@/service/globalService';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { Loader } from './Loader/Loader';

type ChatBotProps = {
  chatbot: Chatbot;
};

const { Paragraph, Title } = Typography;

const { TextArea } = Input;
export const ChatBot: React.FC<ChatBotProps> = ({ chatbot }) => {
  const router = useRouter();
  const [questionValue, setQuestionValue] = useState<string>('');
  const user = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isBotAnswering, setIsBotAnswering] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const conversationId = localStorage.getItem('conversationId');
      if (!conversationId) {
        localStorage.setItem('conversationId', nanoid());
      }
    }
  }, []);

  const endOfBlock = useRef<HTMLDivElement | null>(null);
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
    const conversationId = localStorage.getItem('conversationId');
    const body = {
      question: question,
      chatbot_id: chatbot._id,
      conversation_id: conversationId,
      user_messages: messages.filter(item => item.role === 'user').slice(-5),
    };
    try {
      const response = await fetch('/api/chat-stream', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.body) {
        const reader = response.body.getReader();
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const text = new TextDecoder().decode(value);
          setCurrentAnswer(prevState => prevState + text);
          if (endOfBlock.current) {
            endOfBlock.current.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }

      setIsBotAnswering(false);
      setButtonLoading(false);
    } catch (e) {
      setIsBotAnswering(false);
      //message.error('Произошла ошибка', 2000, () => router.reload());
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    if (!isBotAnswering && currentAnswer) {
      setMessages(prevState => {
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
      <div
        className=" sticky top-0 w-full bg-white"
        style={{ backgroundColor: 'rgb(243, 243, 241)' }}
      >
        <div className="flex justify-between mb-0 pt-[2em]  z-10">
          <div className="flex items-center">
            <Image
              className="rounded-full m-1 mr-2 w-10 h-10"
              src={chatbot.settings.profile_picture_path}
              alt={'Image profile'}
              width={100}
              height={100}
            />
            <Typography>{chatbot.settings.display_name}</Typography>
          </div>
        </div>
        <div className="py-3 flex flex-col overflow-x-auto border-b border-black">
          {chatbot.settings.suggested_messages.map(msg => {
            return (
              <Suggestion
                disabled={buttonLoading}
                textProp={msg}
                key={msg}
                onclick={() => sendMessage(msg)}
              />
            );
          })}
        </div>
      </div>
      <div
        className={'flex flex-col'}
        style={{ backgroundColor: 'rgb(243, 243, 241)' }}
      >
        {chatbot.settings.initial_messages.map((msg, index) => {
          return (
            <ChatMessage chat_role={'assistant'} textProp={msg} key={index} />
          );
        })}
        {messages.map(msg => {
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
          <div ref={endOfBlock}>
            <ChatMessage textProp={currentAnswer} chat_role={'assistant'} />
          </div>
        ) : (
          isBotAnswering && <Loader />
        )}
        <div className="mt-5 flex flex-col items-center">
          <Image
            className="mb-2"
            src={'/flash.png'}
            alt=""
            width={40}
            height={40}
          />
          <Title level={5}>
            Povered by: <a href="https://godman.tech/">Godman</a>
          </Title>
        </div>
        {/* <Loader /> */}
      </div>
      <div
        className=" sticky bottom-0 bg-inherit"
        style={{ backgroundColor: 'rgb(243, 243, 241)' }}
      >
        <div>
          <div className="flex pl-3 p-1 rounded mb-10">
            <div className="flex items-center w-full relative">
              <Input
                value={questionValue}
                onChange={e => setQuestionValue(e.target.value)}
                placeholder="Ask me anything..."
                style={{ fontSize: '1rem' }}
                onKeyDown={async e => {
                  if (e.key === 'Enter' && questionValue.length > 0) {
                    await sendMessage(questionValue);
                  }
                }}
                aria-label="chat input"
                className="m-0 w-full min-h-[3.5rem] max-h-36 pr-7 rounded-lg "
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Button
                  loading={buttonLoading}
                  className={`flex-none border-0 ${
                    !questionValue.length
                      ? 'bg-opacity-50 bg-transparent'
                      : 'bg-transparent'
                  }`}
                  onClick={() => sendMessage(questionValue)}
                  icon={<SendOutlined style={{ fontSize: '26px' }} />}
                  disabled={!questionValue.length}
                ></Button>
              </div>
            </div>
            {/* <div className="flex items-center">
              <Button
                loading={buttonLoading}
                className={`flex-none border-none ${
                  !questionValue.length ? 'bg-opacity-50' : 'bg-transparent'
                }`}
                onClick={() => sendMessage(questionValue)}
                icon={<SendOutlined />}
                disabled={!questionValue.length}
              ></Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
