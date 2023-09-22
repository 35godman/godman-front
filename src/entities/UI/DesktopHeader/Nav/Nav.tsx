import { FC } from 'react';
import s from './Nav.module.css';
import Link from 'next/link';
export const Nav: FC = () => {
  return (
    <div className={s.featureNav}>
      <Link className={s.featureLink} href={'/'}>
        Features
      </Link>
      <Link className={s.featureLink} href={'/'}>
        Cases
      </Link>
      <Link className={s.featureLink} href={'/'}>
        Pricing
      </Link>
      <Link className={s.featureLink} href={'/'}>
        Help
      </Link>
      <Link className={s.featureLink} href={'/'}>
        English
      </Link>
    </div>
  );
};
