import React from 'react';
import { Nav } from '@/entities/UI/DesktopHeader/Nav/Nav';
// import Logo from '../../../../public/svg/1440/logo.svg';
import Image from 'next/image';
import s from './MainPageHeader.module.css';
import { BtnUniv } from '../Buttons/Buttons';
import { useRouter } from 'next/router';
const MainPageHeader = () => {
  const router = useRouter();
  return (
    // <div className={'flex items-center w-full justify-between'}>
    <div className={s.headerWrapper}>
      <div className={s.logoWrapper}>
        <Image
          style={{ marginRight: '5px' }}
          src="/imgGeneralPage/logoAI.png"
          alt=""
          width={251}
          height={32}
        />
      </div>
      <Nav />
      <div className={s.btns}>
        <BtnUniv
          text="Log in"
          type="regular"
          width={113}
          onClick={async () => await router.push('account/login')}
        />
        <BtnUniv
          text="Sign Up Free"
          type="primary"
          width={167}
          onClick={async () => await router.push('/account/register')}
        />
      </div>
    </div>
  );
};

export default MainPageHeader;
