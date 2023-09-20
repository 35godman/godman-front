import React from 'react';
import s from './CardCases.module.css';

type CardCasesProps = {
  text: string;
  name: string;
};

export const CardCases: React.FC<CardCasesProps> = ({ text, name }) => {
  return (
    <div className={s.cardWrapper}>
      <img className={s.rating} src="imgGeneralPage/rating.png" alt="" />
      <p className={s.text}>{text}</p>
      <p className={s.name}>{name}</p>
    </div>
  );
};
