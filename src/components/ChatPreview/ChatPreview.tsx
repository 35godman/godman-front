import React, { FC, useEffect, useState } from 'react';
import s from '@/components/Settings/Settings.module.css';
import sPrev from './ChatPreview.module.css';
import { Button, Image, Input } from 'antd';
import { Suggestion } from '@/components/Suggestion/Suggestion';
import { ChatMessage } from '@/components/ChatMessage/ChatMessage';
import { UserMessage } from '@/components/UserMessage/UserMessage';
import { ReloadOutlined, SendOutlined } from '@ant-design/icons';
import { Chatbot } from '@/types/models/globals';

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
      const arr = chatbot.settings.new_suggested_messages.split('\n');
      setInitialMsgArr(arr);
    }
  }, [chatbot]);

  return (
    <div className={s.chatPreview}>
      <div className={s.chatPreviewHeader}>
        <div>
          {!chatbot.settings.remove_profile_picture_checked && (
            <div className={s.ChatPreviewImgWrapper}>
              <Image
                src={chatbot.settings.profile_picture_path}
                alt="Профиль"
                className={sPrev.profileImg}
              />
            </div>
          )}
        </div>
      </div>
      <div className={s.chatPreviewContent}>
        {initialMsgArr.map((message) => {
          return <ChatMessage key={message} textProp={message} />;
        })}
        <div className={s.userMessage}>
          <UserMessage
            text={'Hello'}
            color={chatbot.settings.user_message_color}
          />
        </div>
      </div>

      <div>
        {suggestMsgArr.map((message) => {
          return <Suggestion key={message} textProp={message} />;
        })}
      </div>

      <div
        className={s.chatPreviewFooter}
        style={{
          backgroundColor: chatbot.settings.chat_bubble_color,
        }}
      >
        <Button
          className={s.chatPreviewReloadButton}
          // type="primary"
          shape="circle"
          size="large"
          icon={
            <ReloadOutlined
              style={{
                fontSize: '24px',
              }}
            />
          }
        />

        <Input
          className={s.chatPreviewInput}
          suffix={
            <SendOutlined
              style={{
                fontSize: '20px',
              }}
            />
          }
          placeholder="Enter your message"
        />
      </div>
    </div>
  );
};

export default ChatPreview;
