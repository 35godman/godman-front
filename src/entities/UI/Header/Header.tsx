import React, { useState } from 'react';
import s from './Header.module.css';
import Image from 'next/image';
import { BurgerIcon } from '../BurgerIcon/BurgerIcon';
import Link from 'next/link';
import { BtnUniv } from '../Buttons/Buttons';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();
  const [externalState, setExternalState] = useState(false);
  return (
    <header className={s.header}>
      <div className={s.navWrapper}>
        <div className={s.logoWrapper}>
          <Image
            style={{ marginRight: '5px' }}
            src="/ellipse_pro.png"
            alt=""
            width={26}
            height={20}
          />
          <p className={s.text}>Godman.AI</p>
        </div>
        <BurgerIcon externalSetState={setExternalState} />
      </div>
      <div className={`${s.navPanel} ${externalState ? s.open : ''}`}>
        <Link className={s.link} href="/">
          Feautures
        </Link>
        <Link className={s.link} href="/">
          Cases
        </Link>
        <Link className={s.link} href="/">
          Pricing
        </Link>
        <Link className={s.link} href="/about">
          Help
        </Link>
        <Link className={s.link} href="/contact">
          English
        </Link>
        <BtnUniv
          onClick={async () => await router.push('/account/login')}
          // width={284}
          // height={43}
          type={'regular'}
          text={'Login'}
          style={{ margin: '0 auto', marginBottom: '24px', marginTop: '48px' }}
        ></BtnUniv>
        <BtnUniv
          onClick={async () => await router.push('/account/login')}
          // width={284}
          // height={43}
          type={'primary'}
          text={'Sign Up Free'}
          style={{ margin: '0 auto' }}
        ></BtnUniv>
      </div>
    </header>
  );
};
