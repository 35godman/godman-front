import React from 'react';
import s from './ContactTeam.module.css';
import MainPageHeader from '@/entities/UI/DesktopHeader/MainPageHeader';
import { Header } from '@/entities/UI/Header/Header';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

export const ContactTeam = () => {
  return (
    <div className={s.contactWrapper}>
      <main id="Home" className={s.mainPage}>
        <MainPageHeader />
        <Header />
      </main>
      <section className={s.section}>
        <div className={s.title}>
          <h1 className={s.heading}>Start your project with our team!</h1>
          <p className={s.text}>
            Our minds combined their superpowers to create the ultimate
            <br /> AI chatbot for your business.
          </p>
        </div>
        <div className={s.cards}>
          <div className={s.teamCard}>
            <Image
              alt=""
              src="/imgContacts/dan_godman.png"
              width={70}
              height={70}
              className={s.avatar}
            ></Image>
            <p className={s.text}>Daniel Godman</p>
            <p className={s.text}>CEO & Founder</p>
          </div>
          <div className={s.teamCard}>
            <Image
              alt=""
              src="/imgContacts/ger_gasanov.png"
              width={70}
              height={70}
              className={s.avatar}
            ></Image>
            <p className={s.text}>German Gasanov</p>
            <p className={s.text}>CEO & Co-Founder</p>
          </div>
          <div className={s.teamCard}>
            <p className={s.text}>
              Godman.AI is a small, fast-paced startup. If you&apos;re like us -
              inquisitive, creative explorers who care about improving the dev
              experience - we want you!
            </p>
            <p className={s.text}>
              <Link href="" className={s.workLink}>
                Working at our team &#8594;
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className={cn(s.section, s.development)}>
        <h1 className={s.heading}>
          You are doing business while we provide your development
        </h1>
        <div className={s.devList}>
          <p className={s.devItem}>
            The start of the business is coming soon, and there is no time left?
          </p>
          <p className={s.devItem}>Risky and expensive hiring in the state?</p>
          <p className={s.devItem}>Unskilled and unreliable personnel?</p>
          <p className={s.devItem}>A long search and hiring of specialists?</p>
        </div>
      </section>
    </div>
  );
};
