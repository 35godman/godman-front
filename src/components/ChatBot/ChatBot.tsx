import React, { useEffect, useState } from 'react';
import s from './ChatBot.module.css';
import { Suggestion } from '../Suggestion/Suggestion';
import { InitialChatMessage } from '../ChatMessage/ChatMessage';
import { UserMessage } from '../UserMessage/UserMessage';
import { Button, Input } from 'antd';
import { ReloadOutlined, SendOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { Chatbot, User } from '@/types/models/globals';
import ProfilePicture from '@/components/ChatBot/ProfilePicture/ProfilePicture';
import SendMessageButton from '@/components/ChatBot/SendMessageButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import globalService from '@/service/globalService';
import crawlService from '@/service/crawlService';
import { MessageState } from '@/types/models/chatbotCustom/messageState';
import MessageDisplay from '@/components/ChatBot/MessageDisplay/MessageDisplay';

type ChatBotProps = {
  chatbot: Chatbot;
};

export const ChatBot: React.FC<ChatBotProps> = ({ chatbot }) => {
  const [questionValue, setQuestionValue] = useState<string>('');
  const user = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<MessageState[]>([]);
  //console.log('=>(ChatBot.tsx:27) messages', messages);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number | null>(
    null,
  );

  const sendMessage = async () => {
    setMessages((prevState) => [
      ...prevState,
      {
        content: questionValue,
        role: 'user',
      },
    ]);
    setMessages((prevState) => [
      ...prevState,
      { content: '', role: 'assistant', id: '9' },
    ]);
    setCurrentMessageIndex(9);

    const body = {
      question: questionValue,
      user_id: user._id,
      chatbot_id: chatbot._id,
    };
    const response = await fetch('http://localhost:5050/v1/embedding/ask', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('=>(SendMessageButton.tsx:24) response', response);
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
        const newState = [...messages];
        console.log('=>(ChatBot.tsx:82) newState', newState);
        /**
         * FIXME: попробовать вынести добавление вопроса пользователя в отдельную функцию
         */
        if (newState.length > 0) {
          newState[newState.length - 1].content += text;
        }

        setMessages(newState);
      }
    }
  };

  return (
    <>
      {chatbot && chatbot.settings && (
        <div className={s.chatPreview}>
          <div className={s.chatPreviewHeader}>
            <div>
              <div className={s.ChatPreviewImgWrapper}>
                <ProfilePicture
                  remove_profile_picture_checked={
                    chatbot.settings.remove_profile_picture_checked
                  }
                  profile_picture_path={chatbot.settings.profile_picture_path}
                />
                <div className={s.chatPreviewName}>
                  {chatbot.settings.display_name}
                </div>
              </div>
            </div>
          </div>
          <div className={s.chatPreviewContent}>
            {chatbot.settings.initial_messages.map((message) => {
              return <InitialChatMessage textProp={message} key={message} />;
            })}
            {messages.map((message, index) => {
              return (
                <MessageDisplay
                  key={index}
                  role={message.role}
                  text={message.content}
                  chatbot={chatbot}
                />
              );
            })}
          </div>

          <div
            className={s.chatPreviewFooter}
            style={{ backgroundColor: chatbot.settings.chat_bubble_color }}
          >
            <Suggestion textProp="What is Godman?" />
            <Button
              className={s.chatPreviewReloadButton}
              // type="primary"
              shape="circle"
              size="large"
              icon={<ReloadOutlined style={{ fontSize: '24px' }} />}
            />

            <Input
              onChange={(e) => setQuestionValue(e.target.value)}
              className={s.chatPreviewInput}
              suffix={<SendMessageButton onclick={sendMessage} />}
              placeholder="Enter your message"
            />
          </div>
        </div>
      )}
    </>
  );
};
