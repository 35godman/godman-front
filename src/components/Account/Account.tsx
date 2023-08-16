import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import Cookies from 'js-cookie';
import { Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import PrimaryButton from '@/components/UI/PrimaryButton/PrimaryButton';

const AccountComponent = () => {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user);

  const signOut = async () => {
    Cookies.remove('access_token');
    await router.push('/');
  };
  return (
    <div
      className={
        'flex flex-col w-[50%] m-auto justify-start sm:h-[65rem] h-[30rem]'
      }
    >
      <Typography className={'mt-4 font-bold size text-3xl text-center '}>
        <FormattedMessage id={'account'} />
      </Typography>
      <div
        className={
          'rounded-2xl bg-blue-200 h-20 flex flex-col items-center justify-center mt-3'
        }
      >
        <Typography className={'font-bold'}>
          <FormattedMessage id={'account-email'} />
        </Typography>
        <Typography className={'font-bold'}>{user.email}</Typography>
      </div>
      <div className="mx-auto my-0">
        <PrimaryButton onclick={signOut}>
          <FormattedMessage id={'account-sign-out'} />
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AccountComponent;
