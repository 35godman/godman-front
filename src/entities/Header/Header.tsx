import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { RootState, useAppDispatch } from '@/app/store/store';
import { setUser } from '@/app/store/slices/userSlice';
import Cookies from 'js-cookie';
import { domainConfig } from '@/config/domain.config';
import PrimaryButton from '@/entities/PrimaryButton/PrimaryButton';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useIntl } from 'react-intl';
export const Header = () => {
  const initialRender = useRef(true);
  const intl = useIntl();
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
            await router.push('/account/login');
          }
        } catch (e) {
          message.info('Нужно войти в аккаунт');
          await router.push('/account/login');
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
    <div className={'flex p-8 justify-evenly   items-center'}>
      {user._id && (
        <>
          <div className={'w-[35%]'}>
            <Image
              src={'/logo-gradient2.svg'}
              alt={'Logo'}
              width={200}
              height={100}
            />
          </div>
          <PrimaryButton
            onclick={() => goToPage('chatbot-list')}
            text={intl.formatMessage({ id: 'header.list' })}
          />
          <PrimaryButton
            onclick={() => goToPage('account')}
            text={intl.formatMessage({ id: 'header.acc' })}
          />
        </>
      )}
    </div>
  );
};
