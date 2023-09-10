import React from 'react';
import s from './CardFeatures.module.css';

type CardProps = {
  heading: string;
  text: string;
};

export const CardFeatures: React.FC<CardProps> = ({ heading, text }) => {
  return (
    <div className={s.cardWrapper}>
      <div className={s.headingWrapper}>
        <div className={s.imgWrapper}>
          <img className={s.img} src="ellipse.png" alt="" />
        </div>
        <p className={s.heading}>{heading}</p>
      </div>
      <p className={s.text}>{text}</p>
    </div>
  );
};
