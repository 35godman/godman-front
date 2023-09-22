import React from 'react';
import s from './askComp.module.css';

type AskProps = {
  text: string;
};

export const AskComp: React.FC<AskProps> = ({ text }) => {
  return (
    <div className={s.answerWrap}>
      <div className={s.imgAndTextWrap}>
        <img className={s.ellipseImg} src="/imgGeneralPage/avatar.png" alt="" />
        <p className={s.answer}>{text}</p>
      </div>
      <img
        className={s.borderLine}
        src="/imgGeneralPage/talk_line.png"
        alt=""
      />
    </div>
  );
};
