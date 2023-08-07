import React, { forwardRef } from 'react';
import s from './Loader.module.css';

type LoaderProps = {
  color_bubble?: string;
  color_container?: string;
};

const Loader = forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
  const { color_bubble, color_container } = props; // Destructuring props

  return (
    <div
      ref={ref}
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
});
Loader.displayName = 'Loader'; // Set the display name for the component

export { Loader };
