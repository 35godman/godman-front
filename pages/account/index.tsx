import React from 'react';
import { Typography } from 'antd';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';
const AccountPage = () => {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);

  const signOut = async () => {
    Cookies.remove('access_token');
    await router.push('/');
  };
  return (
    <div className={'flex flex-col w-[50%] m-auto justify-between h-[30rem]'}>
      <Typography className={'font-bold size text-3xl'}>Account</Typography>
      <div
        className={
          'rounded-2xl bg-blue-200 h-20 flex items-center justify-center'
        }
      >
        <Typography className={'font-bold'}>Your email {user.email}</Typography>
      </div>

      <PrimaryButton onclick={signOut}>Sign Out</PrimaryButton>
    </div>
  );
};

export default AccountPage;
