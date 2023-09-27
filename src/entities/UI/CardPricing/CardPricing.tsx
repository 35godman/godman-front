import React, { useEffect, useState } from 'react';
import s from './CardPricing.module.css';
import { BtnUniv } from '../../UI/Buttons/Buttons';

type CardPricingProps = {
  cardName: string;
  text: string;
  benefits: Array<string>;
  price: number;
  logo: string;
};

export const CardPricing: React.FC<CardPricingProps> = ({
  cardName,
  text,
  benefits,
  price,
  logo,
}) => {
  const [src, setSrc] = useState<string>('');
  const [btnType, setType] = useState<string>('regular');
  const [btnText, setText] = useState<string>('');
  const [id, setId] = useState<string>('');
  useEffect(() => {
    switch (logo) {
      case 'basic':
        setSrc('imgGeneralPage/ellipse_basic.png');
        setText('Get Basic');
        setId('Get_Basic');
        break;
      case 'pro':
        setSrc('imgGeneralPage/ellipse_pro.png');
        setText('Get Pro');
        setId('Get_Pro');
        break;
      case 'enterprise':
        setSrc('imgGeneralPage/ellipse_enterprise.png');
        setText('Get Enterprise');
        setId('Get_Enterprise');
        break;
    }
  }, []);
  return (
    <div
      id={id}
      className={s.cardWrapper}
      onMouseEnter={() => setType('primary')}
      onMouseLeave={() => setType('regular')}
    >
      <div>
        <div className={s.header}>
          <div>
            <img className={s.img} src={src} alt="" />
          </div>
          <p className={s.name}>{cardName}</p>
        </div>
        <div className={s.text}>{text}</div>
      </div>
      <div>
        {benefits.map(benefit => {
          return (
            <div key={benefit} className={s.benefit}>
              <img
                className={s.imgOk}
                src="/imgGeneralPage/icon_ok.png"
                alt=""
              />{' '}
              {benefit}
            </div>
          );
        })}
      </div>
      <div className={s.footerWrap}>
        <p className={s.price}>
          $ <span className={s.spanPrice}>{price}</span>
        </p>
        <BtnUniv type={btnType} text={btnText}></BtnUniv>
      </div>
    </div>
  );
};
