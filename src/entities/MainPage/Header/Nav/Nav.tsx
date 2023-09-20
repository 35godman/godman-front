import { FC } from 'react';
import s from './Nav.module.css';
export const Nav: FC = () => {
  return (
    <div className={s.featureNav}>
      <p className={s.featureLink}>Features</p>
      <p className={s.featureLink}>Cases</p>
      <p className={s.featureLink}>Pricing</p>
      <p className={s.featureLink}>Help</p>
      <p className={s.featureLink}>English</p>
    </div>
  );
};
