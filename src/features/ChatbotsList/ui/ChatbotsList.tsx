import React, { FC, useCallback, useEffect, useState } from 'react';
import s from './ChatbotsList.module.css';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { RootState, useAppDispatch } from '@/app/store/store';
import { AxiosResponse } from 'axios';
import globalService from '@/shared/service/globalService';
import { Chatbot } from '@/types/models/globals';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { resetChars } from '@/app/store/slices/charsCountSlice';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { CardBot } from '@/entities/CardBot/CardBot';
import {
  createChatbot,
  getChatbotsByUserId,
} from '@/features/ChatbotsList/api';
import Head from 'next/head';

export const ChatbotsList: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { Title } = Typography;
  const [botsDB, setBotsDB] = useState<Chatbot[]>([]);
  const getBots = useCallback(async () => {
    const chatbots = await getChatbotsByUserId(user._id);
    setBotsDB(chatbots);
  }, [user]);

  useEffect(() => {
    if (user._id) {
      getBots();
    }
    //eslint-disable-next-line
  }, [user]);

  const createHandler = async () => {
    const resData = await createChatbot(user._id);
    dispatch(resetChars());
    await router.push(`/gs-bot?chatbot_id=${resData._id}`);
  };
  const changeChatbot = async (botID: string) => {
    dispatch(resetChars());
    await router.push(`/gs-bot?chatbot_id=${botID}`);
  };

  return (
    <>
      <Head>
        <script
          src="https://godman.tech/static/scripts/embed-script.js"
          defer
        ></script>
      </Head>
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
              <PrimaryButton onclick={createHandler}>
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
                      onClick={() => changeChatbot(bot._id)}
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
