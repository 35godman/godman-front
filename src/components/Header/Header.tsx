import React, { useEffect, useRef } from 'react';
import s from './Header.module.css';
import globalService from '@/service/globalService';
import { message } from 'antd';
import { useRouter } from 'next/router';
export const Header = () => {
  const initialRender = useRef(true);
  const router = useRouter();
  useEffect(() => {
    if (initialRender.current) {
      const relogin = async () => {
        try {
          await globalService.get('auth/relogin');
          await router.push('/chatbot-list');
        } catch (e) {
          message.info('Нужно войти в аккаунт');
        }
      };
      relogin();
      initialRender.current = false;
    }
  }, [router]);
  return <div className={s.generalHeader}>Header</div>;
};
