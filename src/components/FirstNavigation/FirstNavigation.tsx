import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import s from './FirstNavigation.module.css';

export const FirstNavigation = () => {
  const router = useRouter();
  return (
    <div className={s.btnsWrapper}>
      <Button className={s.btn} onClick={() => router.push('/data-source')}>
        Create chatbot
      </Button>
      <Button className={s.btn} onClick={() => router.push('/chatbot-list')}>
        List chatbots
      </Button>
    </div>
  );
};
