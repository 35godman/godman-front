import React, { useEffect, useState } from 'react';
import s from './ChatBot.module.css';
import { Suggestion } from '../Suggestion/Suggestion';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { UserMessage } from '../UserMessage/UserMessage';
import { Button, Input } from 'antd';
import { ReloadOutlined, SendOutlined } from '@ant-design/icons';
import { Image } from 'antd';

type ChatBotProps = {
  chatMC?: string;
  footerC?: string;
  userMC?: string;
  profilePic?: string;
  botName?: string;
};

export const ChatBot: React.FC<ChatBotProps> = ({
  chatMC,
  footerC,
  userMC,
  profilePic,
  botName,
}) => {
  const [chatMessageColor, setChatMessageColor] = useState<string>('#E3E5E8');
  const [footerColor, setFooterColor] = useState<string>('#E3E5E8');
  const [userMessageColor, setUserMessageColor] = useState<string>('#CBD5E3');
  const [profilePicture, setProfilePicture] = useState<string>(
    'https://static.vecteezy.com/system/resources/previews/007/225/199/non_2x/robot-chat-bot-concept-illustration-vector.jpg',
  );
  const [name, setName] = useState<string>('Bot77777');

  useEffect(() => {
    if (chatMC && chatMC.length > 0) {
      setChatMessageColor(chatMC);
    }
    if (footerC && footerC.length > 0) {
      setFooterColor(footerC);
    }
    if (userMC && userMC.length > 0) {
      setUserMessageColor(userMC);
    }
    if (profilePic && profilePic.length > 0) {
      setProfilePicture(profilePic);
    }
    if (botName && botName.length > 0) {
      setName(botName);
    }
  }, [botName, chatMC, footerC, profilePic, userMC]);
  return (
    <div className={s.chatPreview}>
      <div className={s.chatPreviewHeader}>
        <div>
          <div className={s.ChatPreviewImgWrapper}>
            <Image
              src={profilePicture}
              alt="Профиль"
              style={{
                maxHeight: '80px',
                maxWidth: '40px',
                borderRadius: '30px',
                margin: '3px 0',
                marginRight: '10px',
              }}
            />
            <div className={s.chatPreviewName}>{name}</div>
          </div>
        </div>
      </div>
      <div className={s.chatPreviewContent}>
        <Suggestion
          backgroundColor={chatMessageColor}
          textProp="What is Godman?"
        />
        <ChatMessage
          text="Welcome to Godman, I am your AI assistant - Godman. How can I help you today?"
          color={chatMessageColor}
        />
        <UserMessage
          text="Hello, my name is Robert. Whats the whether today?"
          color={userMessageColor}
        />
      </div>

      <div
        className={s.chatPreviewFooter}
        style={{ backgroundColor: footerColor }}
      >
        <Button
          className={s.chatPreviewReloadButton}
          // type="primary"
          shape="circle"
          size="large"
          icon={<ReloadOutlined style={{ fontSize: '24px' }} />}
        />

        <Input
          className={s.chatPreviewInput}
          suffix={<SendOutlined style={{ fontSize: '20px' }} />}
          placeholder="Enter your message"
        />
      </div>
    </div>
  );
};
