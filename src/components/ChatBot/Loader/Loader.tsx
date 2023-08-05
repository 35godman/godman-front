import React from 'react';
import s from './Loader.module.css';

type LoaderProps = {
  color_bubble?: string;
  color_container?: string;
};

export const Loader: React.FC<LoaderProps> = ({
  color_bubble = '#fff',
  color_container = 'rgb(30, 35, 48)',
}) => {
  return (
    <div
      className={s.outerWrapper}
      style={{ backgroundColor: color_container }}
    >
      <div className={s.dotWrapper}>
        <div
          className={s.dot}
          style={{ backgroundColor: color_bubble, animationDelay: '0s' }}
        />
        <div
          className={s.dot}
          style={{
            backgroundColor: color_bubble,
            animationDelay: '0.3s',
          }}
        />
        <div
          className={s.dot}
          style={{
            backgroundColor: color_bubble,
            animationDelay: '0.6s',
          }}
        />
      </div>
    </div>
  );
};
