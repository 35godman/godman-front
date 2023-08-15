import React, { FC, useCallback, useEffect, useState } from 'react';
import s from './ChatbotsList.module.css';
import { Typography } from 'antd';
import { CardBot } from './CardBot';
import { useRouter } from 'next/router';
import { RootState, useAppDispatch } from '@/features/store';
import { AxiosResponse } from 'axios';
import globalService from '@/service/globalService';
import { Chatbot } from '@/types/models/globals';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { resetChars } from '@/features/slices/charsCountSlice';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

export const ChatbotsList: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { Title } = Typography;
  const [botsDB, setBotsDB] = useState<Chatbot[]>([]);
  const getBotsByUserId = useCallback(async () => {
    const response: AxiosResponse<Chatbot[]> = await globalService.get(
      `/chatbot/find/user/${user._id}`,
    );
    setBotsDB(response.data);
  }, [user]);

  useEffect(() => {
    if (user._id) {
      getBotsByUserId();
    }
    //eslint-disable-next-line
  }, [user]);

  const createChatbot = async () => {
    const response: AxiosResponse<Chatbot> = await globalService.post(
      '/chatbot/create-default',
      {
        user_id: user._id,
      },
    );
    dispatch(resetChars());
    await router.push(`/gs-bot?chatbot_id=${response.data._id}`);
  };
  return (
    <>
      <div className={s.botsListWrapper}>
        {/*<iframe*/}
        {/*  src="http://localhost:3000/chatbot-iframe/64d4cb756deecfdc32ccc6f7"*/}
        {/*  width="100%"*/}
        {/*  id="godman-chatbot"*/}
        {/*  title={'godman'}*/}
        {/*></iframe>*/}
        {/*<iframe*/}
        {/*/!*  src="https://www.chatbase.co/chatbot-iframe/lciKz7FlMEb2lsfwxgAXN"*!/*/}
        {/*/!*  width="100%"*!/*/}
        {/*/!*  style={{ height: '100%', minHeight: '700px' }}*!/*/}
        {/*/!*  frameBorder="0"*!/*/}
        {/*/!*></iframe>*!/*/}
        <div>
          <div className={s.botsListHeader}>
            <div>
              <PrimaryButton onclick={createChatbot}>
                <FormattedMessage id={'chatbotList.create'} />
              </PrimaryButton>
            </div>
            <div>
              <Title className="mt-8" level={3}>
                <FormattedMessage id={'chatbotList.my-chatbots'} />
              </Title>
            </div>
            <div className={s.botListAll}>
              {botsDB.length > 0 &&
                botsDB.map((bot) => {
                  return (
                    <CardBot
                      botID={bot._id}
                      key={bot._id}
                      nameBot={bot.chatbot_name}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
