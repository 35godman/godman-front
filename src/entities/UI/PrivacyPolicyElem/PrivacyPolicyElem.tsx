import React from 'react';
import s from './PrivacyPolicyElem.module.css';

type PrivacyPolicyElemProps = {
  heading: string;
  text: string;
};

export const PrivacyPolicyElem: React.FC<PrivacyPolicyElemProps> = ({
  heading,
  text,
}) => {
  return (
    <div className={s.policyElemWrapper}>
      <div className={s.headingWrap}>
        <div className={s.imgWrapper}>
          <img className={s.img} src="imgGeneralPage/ellipse.png" alt="" />
        </div>
        <div className={s.heading}>{heading}</div>
      </div>
      <div className={s.text}>{text}</div>
    </div>
  );
};
