import React, { useEffect, useRef } from 'react';
import s from './Header.module.css';
import globalService from '@/service/globalService';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/features/store';
import { setUser } from '@/features/slices/userSlice';
import Cookies from 'js-cookie';
import { domainConfig } from '@/config/domain.config';
export const Header = () => {
  const initialRender = useRef(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = Cookies.get('access_token');
  useEffect(() => {
    if (initialRender.current) {
      const relogin = async () => {
        try {
          const response = await fetch(
            `${domainConfig.BACKEND_DOMAIN_NAME}/v1/auth/relogin`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data = await response.json();

          if (data) {
            dispatch(setUser(data));
            await router.push('/chatbot-list');
          }
        } catch (e) {
          message.info('Нужно войти в аккаунт');
          await router.push('/');
        }
      };
      relogin();
      initialRender.current = false;
    }
  }, [router, token]);

  return <div className={s.generalHeader}>Header</div>;
};
