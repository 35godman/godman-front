import React, { FC } from 'react';
import s from '@/entities/MainPage/MainPage.module.css';
import { Input } from 'antd';
import { BtnUniv } from '@/entities/UI/Buttons/Buttons';

type EmailContactProps = {
  heading: string;
};

const EmailContact: FC<EmailContactProps> = ({ heading }) => {
  return (
    <section id="Sta" className={`${s.section} ${s.staSection}`}>
      <div className={s.staWrapper}>
        <h2 className={s.staText}>{heading}</h2>
        <div className={s.btnsStaWrap}>
          <Input
            className={s.inputSign}
            placeholder="Enter your business email"
          />
          <BtnUniv clasName={s.regul} type="regular" text={'Sign up free'} />
        </div>
      </div>
    </section>
  );
};

export default EmailContact;
