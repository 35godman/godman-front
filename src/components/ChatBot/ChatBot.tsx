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
import { ReloadOutlined, SendOutlined } from '@ant-design/icons';
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
  setCollapseOpen?: (isOpen: boolean) => void;
};

const { Title } = Typography;

export const ChatBot: React.FC<ChatBotProps> = ({
  chatbot,
  setCollapseOpen,
}) => {
  const [questionValue, setQuestionValue] = useState<string>('');
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isBotAnswering, setIsBotAnswering] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const endOfBlock = useRef<HTMLDivElement | null>(null);
  const endOfChat = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('conversationId', nanoid());
    }
  }, []);

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
        msgColor: chatbot.settings.user_message_color,
      },
    ];
    setMessages(newMessages);
    const conversationId = localStorage.getItem('conversationId');
    const body = {
      question: question,
      chatbot_id: chatbot._id,
      conversation_id: conversationId,
      messages: messages.slice(-2),
    };

    try {
      const response = await fetch('/api/chat-stream', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201 && response.body) {
        const reader = response.body.getReader();
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const text = new TextDecoder().decode(value);
          setCurrentAnswer((prevState) => prevState + text);
          if (endOfBlock.current) {
            endOfBlock.current.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }
      } else if (response.status !== 201 && response.body) {
        const reader = response.body.getReader();
        let errorMessage = '';
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const text = new TextDecoder().decode(value);
          errorMessage += text;
        }
        setCurrentAnswer(JSON.parse(errorMessage).message);
      }

      setIsBotAnswering(false);
      setButtonLoading(false);
      if (setCollapseOpen) {
        setCollapseOpen(true);
      }
    } catch (e) {
      setIsBotAnswering(false);
      //message.error('Произошла ошибка', 2000, () => router.reload());
      setButtonLoading(false);
    }
  };

  const reloadConversation = () => {
    setMessages([]);
    localStorage.setItem('conversationId', nanoid());
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
            msgColor: chatbot.settings.bot_message_color,
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
        className="sticky top-0 w-full border-b border-black"
        style={{ backgroundColor: '#fadada' }}
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
            <Typography className={'text-xl font-bold font-[Montserrat]'}>
              {chatbot.settings.display_name}
            </Typography>
          </div>
        </div>
        <div className="py-3 flex flex-col overflow-x-auto m-auto w-[80%] ">
          {chatbot.settings.suggested_messages.map((msg) => {
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
      <div className={'flex flex-col w-[90%] m-auto '} ref={endOfChat}>
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
              msg_color={msg.msgColor}
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
            <ChatMessage
              textProp={currentAnswer}
              chat_role={'assistant'}
              msg_color={chatbot.settings.bot_message_color}
            />
          </div>
        ) : (
          isBotAnswering && (
            <Loader
              color_bubble={'#fff'}
              color_container={chatbot.settings.bot_message_color}
            />
          )
        )}
      </div>
      <div className=" sticky bottom-0" style={{ backgroundColor: '#fadada' }}>
        <div>
          <div className="flex pl-3 p-1 rounded">
            <div className="flex items-center w-full relative">
              <Button
                loading={buttonLoading}
                className={`flex-none border-0 ${
                  !questionValue.length
                    ? 'bg-opacity-50 bg-transparent'
                    : 'bg-transparent'
                }`}
                onClick={() => reloadConversation()}
                icon={<ReloadOutlined style={{ fontSize: '26px' }} />}
                disabled={!messages.length}
              ></Button>
              <Input
                value={questionValue}
                onChange={(e) => setQuestionValue(e.target.value)}
                placeholder="Ask me anything..."
                style={{ fontSize: '1rem' }}
                onKeyDown={async (e) => {
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
