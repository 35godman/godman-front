import React, { useEffect, useState } from 'react';
import { MessageState } from '@/types/models/chatbotCustom/messageState';
import { nanoid } from 'nanoid';
import { RoleState } from '@/types/models/role';
import { Chatbot } from '@/types/models/globals';
import { scrollToBottom } from '@/features/Chatbot/lib/scrollToBottomOfRef';
import { chatStream } from '@/features/Chatbot/api';

export const useChatbot = (
  chatbot: Chatbot,
  endOfChat: React.RefObject<HTMLDivElement> | null,

  setCollapseOpen?: (isOpen: boolean) => void,
) => {
  const [questionValue, setQuestionValue] = useState<string>('');
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isBotAnswering, setIsBotAnswering] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

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

  const sendMessage = async (question: string) => {
    setQuestionValue('');
    setIsBotAnswering(true);
    setButtonLoading(true);
    setTimeout(() => {
      scrollToBottom(endOfChat);
    }, 100);

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
      const response = await chatStream(body);

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
      setButtonLoading(false);
    }
  };
  return {
    messages,
    questionValue,
    setQuestionValue,
    buttonLoading,
    currentAnswer,
    setCurrentAnswer,
    isBotAnswering,
    sendMessage,
  };
};
