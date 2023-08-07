import React, { useEffect, useRef } from 'react';
import s from './Header.module.css';
import globalService from '@/service/globalService';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { RootState, useAppDispatch } from '@/features/store';
import { setUser } from '@/features/slices/userSlice';
import Cookies from 'js-cookie';
import { domainConfig } from '@/config/domain.config';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import { useSelector } from 'react-redux';
import Image from 'next/image';
export const Header = () => {
  const initialRender = useRef(true);
  const user = useSelector((state: RootState) => state.user);
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

          const data = await response.json();

          if (response.status === 200) {
            dispatch(setUser(data));
            if (router.pathname === '/') {
              await router.push('/chatbot-list');
            }
          } else {
            await router.push('/');
          }
        } catch (e) {
          message.info('Нужно войти в аккаунт');
          await router.push('/');
        }
      };
      relogin();
      initialRender.current = false;
    }
  }, [dispatch, router, token]);

  const goToPage = async (route: string) => {
    await router.push(route);
  };

  return (
    <div className={'flex p-8 justify-evenly bg-blue-400 items-center'}>
      {user._id && (
        <>
          <div className={'w-[35%]'}>
            <Image src={'/logo.PNG'} alt={'Logo'} width={100} height={100} />
          </div>
          <PrimaryButton
            onclick={() => goToPage('chatbot-list')}
            text={'Список чатботов'}
          />
          <PrimaryButton
            onclick={() => goToPage('account')}
            text={'Мой аккаунт'}
          />
        </>
      )}
    </div>
  );
};
