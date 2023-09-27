import { FC } from 'react';
import s from './Nav.module.css';
import Link from 'next/link';

export const Nav: FC = () => {
  const smoothScrollTo = (id: any, event: any) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className={s.featureNav}>
      <Link
        onClick={e => smoothScrollTo('Feautures', e)}
        className={s.featureLink}
        href={''}
      >
        Features
      </Link>
      <Link
        onClick={e => smoothScrollTo('Cases', e)}
        className={s.featureLink}
        href={''}
      >
        Cases
      </Link>
      <Link
        onClick={e => smoothScrollTo('Pricing', e)}
        className={s.featureLink}
        href={''}
      >
        Pricing
      </Link>
      <Link
        onClick={e => smoothScrollTo('Help', e)}
        className={s.featureLink}
        href={''}
      >
        Help
      </Link>
      <Link className={s.featureLink} href={'/'}>
        English
      </Link>
    </div>
  );
};
