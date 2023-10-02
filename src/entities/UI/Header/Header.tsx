import React, { useEffect, useState } from 'react';
import s from './Header.module.css';
import Image from 'next/image';
import { BurgerIcon } from '../BurgerIcon/BurgerIcon';
import Link from 'next/link';
import { BtnUniv } from '../Buttons/Buttons';
import { useRouter } from 'next/router';
import cn from 'classnames';

export const Header = () => {
  const [externalState, setExternalState] = useState(false);
  const router = useRouter();
  const smoothScrollTo = (id: any, event: any) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setExternalState(false);
    }
  };
  return (
    <header className={!externalState ? s.header : cn(s.header, s.headerOpen)}>
      <div className={s.navWrapper}>
        <div className={s.logoWrapper}>
          <Image
            style={{ marginRight: '5px' }}
            src="/imgGeneralPage/ellipse_pro.png"
            alt=""
            width={26}
            height={20}
          />
          <p className={s.text}>Godman.AI</p>
        </div>
        <BurgerIcon
          externalConst={externalState}
          externalSetState={setExternalState}
        />
      </div>
      <div className={`${s.navPanel} ${externalState ? s.open : ''}`}>
        <Link
          onClick={(e) => smoothScrollTo('Feautures', e)}
          className={s.link}
          href=""
        >
          Feautures
        </Link>
        <Link
          onClick={(e) => smoothScrollTo('Cases', e)}
          className={s.link}
          href="/"
        >
          Cases
        </Link>
        <Link
          onClick={(e) => smoothScrollTo('Pricing', e)}
          className={s.link}
          href="/"
        >
          Pricing
        </Link>
        <Link
          onClick={(e) => smoothScrollTo('Help', e)}
          className={s.link}
          href=""
        >
          Help
        </Link>
        <Link className={s.link} href="">
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
          onClick={async () => await router.push('/account/register')}
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
