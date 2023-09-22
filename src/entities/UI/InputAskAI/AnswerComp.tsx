import React from 'react';
import s from './answerComp.module.css';

type AnswerProps = {
  text: string;
};

export const AnswerComp: React.FC<AnswerProps> = ({ text }) => {
  return (
    <div className={s.answerWrap}>
      <div className={s.imgAndTextWrap}>
        <img
          className={s.ellipseImg}
          src="/imgGeneralPage/ellipse_pro.png"
          alt=""
        />
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
