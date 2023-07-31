import React, { useCallback } from 'react';
import s from './Header.module.css';
import globalService from '@/service/globalService';

import { User } from '@/types/models/globals';
import { AxiosResponse } from 'axios';
import { setUser } from '@/features/slices/userSlice';
import { useAppDispatch } from '@/features/store';
import { useRouter } from 'next/router';
import { withAuth } from '@/auth/withAuth';
export const Header = () => {
  // const dispatch = useAppDispatch();
  // const router = useRouter();
  // const getUser = useCallback(async () => {
  //   try {
  //     const response: AxiosResponse<User> = await globalService.get(
  //       'auth/relogin',
  //     );
  //     const { data } = response;
  //     dispatch(setUser(data));
  //   } catch (err) {
  //     await router.push('/login');
  //   }
  // }, [dispatch]);
  return <div className={s.generalHeader}>Header</div>;
};
