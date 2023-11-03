import React from 'react';
import s from './404.module.css';
import Link from 'next/link';

export const PAGE404 = () => {
  return (
    <div className={s.page404Wrapper}>
      <div className={s.heading}>404</div>
      <div className={s.text}>
        Sorry! We couldn’t find that page.
        <br /> Try searching or go to{' '}
        <Link className={s.link404} href={'/'}>
          the Home Page of Godman.AI
        </Link>
      </div>
    </div>
  );
};
